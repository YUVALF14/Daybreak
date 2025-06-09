export const fetchRegistrantsFromSheet = async (spreadsheetId, range) => {
  try {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data.values) return [];
    return data.values.map(row => ({
      name: row[0],
      email: row[1],
      phone: row[2],
    }));
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    throw error;
  }
};
