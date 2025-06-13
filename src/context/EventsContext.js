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

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsRef = ref(database, 'events');
    
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventsList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setEvents(eventsList);
      } else {
        setEvents([]);
      }
    });

    return () => off(eventsRef, 'value', unsubscribe);
  }, []);

  const addEvent = async (eventData) => {
    try {
      const eventsRef = ref(database, 'events');
      const newEventRef = push(eventsRef);
      await set(newEventRef, {
        ...eventData,
        createdAt: new Date().toISOString(),
        participants: eventData.participants || []
      });
      return newEventRef.key;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  };

  const updateEvent = async (eventId, updates) => {
    try {
      const eventRef = ref(database, `events/${eventId}`);
      await update(eventRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const eventRef = ref(database, `events/${eventId}`);
      await remove(eventRef);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
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
