import React, { createContext, useContext, useState } from 'react';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  // Mock data for now to ensure the app loads
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'אירוע לדוגמה',
      date: '2025-06-20',
      location: 'פראג',
      description: 'אירוע לדוגמה לבדיקת המערכת',
      price: 100,
      subsidy: 50,
      participants: []
    }
  ]);

  const addEvent = async (eventData) => {
    try {
      const newEvent = {
        ...eventData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        participants: eventData.participants || []
      };
      setEvents(prev => [...prev, newEvent]);
      return newEvent.id;
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  };

  const updateEvent = async (eventId, updates) => {
    try {
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, ...updates, updatedAt: new Date().toISOString() }
          : event
      ));
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      setEvents(prev => prev.filter(event => event.id !== eventId));
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
