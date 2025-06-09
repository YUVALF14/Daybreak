import { google } from 'googleapis';

const sheets = google.sheets('v4');

// Initialize with credentials
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export const fetchRegistrantsFromSheet = async (spreadsheetId, range) => {
  try {
    const authClient = await auth.getClient();
    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range,
    });

    return response.data.values.map(row => ({
      name: row[0],
      email: row[1],
      phone: row[2],
      // Add more fields as needed based on your sheet structure
    }));
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
}; 
