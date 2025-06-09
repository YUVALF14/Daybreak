import axios from 'axios';

// Fetch registrants by calling the server endpoint
export const fetchRegistrantsFromSheet = async (spreadsheetId, range) => {
  try {
    const response = await axios.post('/api/google-sheets', {
      spreadsheetId,
      range,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
};
