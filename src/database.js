import { ref, set, get, update } from 'firebase/database';
import { database } from '../config/firebase';

// שמירת אירועים בענן
export const saveEventsToCloud = async (events) => {
  try {
    const eventsRef = ref(database, 'events');
    await set(eventsRef, events);
    return true;
  } catch (error) {
    console.error('Error saving events to cloud:', error);
    throw error;
  }
};

// קריאת אירועים מהענן
export const loadEventsFromCloud = async () => {
  try {
    const eventsRef = ref(database, 'events');
    const snapshot = await get(eventsRef);
    return snapshot.exists() ? snapshot.val() : [];
  } catch (error) {
    console.error('Error loading events from cloud:', error);
    throw error;
  }
};

// עדכון אירוע בודד
export const updateEventInCloud = async (eventId, eventData) => {
  try {
    const eventRef = ref(database, `events/${eventId}`);
    await update(eventRef, eventData);
    return true;
  } catch (error) {
    console.error('Error updating event in cloud:', error);
    throw error;
  }
};

// שמירת משתתף באירוע
export const saveParticipantToEvent = async (eventId, participant) => {
  try {
    const participantRef = ref(database, `events/${eventId}/participants/${participant.id}`);
    await set(participantRef, participant);
    return true;
  } catch (error) {
    console.error('Error saving participant to cloud:', error);
    throw error;
  }
}; 
