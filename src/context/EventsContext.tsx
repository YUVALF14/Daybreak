import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from '../config/firebase';
import {
  ref,
  onValue,
  push,
  set,
  update,
  remove,
  off,
} from 'firebase/database';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  maxParticipants?: number;
  price?: number;
  subsidy?: number;
  [key: string]: any; // <-- Add index signature
}

interface EventsContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const eventsRef = ref(database, 'events');
    const handleValue = (snapshot: any) => {
      const data = snapshot.val();
      console.log('Firebase events data:', data); // DEBUG
      if (!data) {
        setEvents([]);
        return;
      }
      // Convert object to array with id
      const arr = Object.entries(data).map(([id, value]: [string, any]) => ({
        id,
        ...value,
      }));
      setEvents(arr);
    };
    onValue(eventsRef, handleValue);
    return () => off(eventsRef, 'value', handleValue);
  }, []);

  const addEvent = async (eventData: Omit<Event, 'id'>) => {
    console.log('EventsContext addEvent called with:', eventData); // DEBUG
    const eventsRef = ref(database, 'events');
    const newRef = push(eventsRef);
    const id = newRef.key;
    // Remove undefined numeric fields before saving
    const cleanEvent: { [key: string]: any } = { ...eventData, id, participants: eventData.participants || [] };
    Object.keys(cleanEvent).forEach((key) => {
      if (cleanEvent[key] === undefined) delete cleanEvent[key];
    });
    await set(newRef, cleanEvent);
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    console.log('EventsContext updateEvent called with:', id, eventData); // DEBUG
    const eventRef = ref(database, `events/${id}`);
    // Remove undefined numeric fields before updating
    const cleanEvent: { [key: string]: any } = { ...eventData };
    Object.keys(cleanEvent).forEach((key) => {
      if (cleanEvent[key] === undefined) delete cleanEvent[key];
    });
    await update(eventRef, cleanEvent);
  };

  const deleteEvent = async (id: string) => {
    const eventRef = ref(database, `events/${id}`);
    await remove(eventRef);
  };

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};