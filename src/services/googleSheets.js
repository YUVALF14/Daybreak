import { google } from 'googleapis';

const sheets = google.sheets('v4');

// Use a backend environment variable, not REACT_APP_ prefix
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

/**
 * Fetch registrants from a Google Sheet.
 * @param {string} spreadsheetId
 * @param {string} range
 * @returns {Promise<Array<{name: string, email: string, phone: string}>>}
 */
export const fetchRegistrantsFromSheet = async (spreadsheetId, range) => {
  try {
    const authClient = await auth.getClient();
    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range,
    });

    // Adjust mapping as needed for your sheet columns
    return (response.data.values || []).map(row => ({
      name: row[0],
      email: row[1],
      phone: row[2],
    }));
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
};
