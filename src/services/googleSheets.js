import axios from 'axios';

export const fetchRegistrantsFromSheet = async (spreadsheetId, range) => {
  const response = await axios.post('/api/google-sheets', {
    spreadsheetId,
    range,
  });
  return response.data.registrants;
};
