export const fetchRegistrantsFromSheet = async (spreadsheetId, range) => {
  try {
    const params = new URLSearchParams({ spreadsheetId, range });
    const response = await fetch(`/api/google-sheets?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data.values;
  } catch (error) {
    console.error('Error fetching data from Google Sheets API:', error);
    throw error;
  }
};
