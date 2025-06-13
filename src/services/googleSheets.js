// Note: Google Sheets API requires server-side implementation
// This is a placeholder for future server-side integration

/**
 * Fetch registrants from a Google Sheet.
 * @param {string} spreadsheetId
 * @param {string} range
 * @returns {Promise<Array<{name: string, email: string, phone: string}>>}
 */
export const fetchRegistrantsFromSheet = async (spreadsheetId, range) => {
  // This would need to be implemented on the server-side
  console.warn('Google Sheets integration requires server-side implementation');
  return [];
};
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
