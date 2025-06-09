export const fetchRegistrantsFromSheet = async (spreadsheetId, range) => {
  const params = new URLSearchParams({ spreadsheetId, range });
  const response = await fetch(`/api/registrants?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data from Google Sheets');
  }
  return response.json();
};
