const { google } = require('googleapis');

module.exports = async (req, res) => {
  const { spreadsheetId, range } = req.query;
  if (!spreadsheetId || !range) {
    res.status(400).json({ error: 'Missing spreadsheetId or range' });
    return;
  }

  try {
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const values = response.data.values || [];
    const rows = values.map(row => ({
      name: row[0],
      email: row[1],
      phone: row[2],
    }));

    res.status(200).json({ values: rows });
  } catch (error) {
    console.error('Google Sheets API error', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
};
