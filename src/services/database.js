import { ref, set, get, update } from 'firebase/database';
import { database } from '../config/firebase';

/**
 * Save all events to the cloud (overwrites all events).
 * @param {Array|Object} events
 * @returns {Promise<boolean>}
 */
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

/**
 * Load all events from the cloud.
 * @returns {Promise<Array|Object>}
 */
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

/**
 * Update a single event in the cloud.
 * @param {string} eventId
 * @param {Object} eventData
 * @returns {Promise<boolean>}
 */
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

/**
 * Save a participant to a specific event in the cloud.
 * @param {string} eventId
 * @param {Object} participant
 * @returns {Promise<boolean>}
 */
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
