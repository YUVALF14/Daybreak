// Fetch registrant data directly from the Google Sheets API using a public API
// key. This avoids relying on the `googleapis` package, which requires Node
// built-in modules that are not available in the browser environment.

export const fetchRegistrantsFromSheet = async (spreadsheetId, range) => {
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error('REACT_APP_GOOGLE_API_KEY is not defined');
  }

  const encodedRange = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}?key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();

    return (data.values || []).map(row => ({
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
