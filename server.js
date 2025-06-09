require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

const upload = multer();

// File paths
const DATA_FILE = path.join(__dirname, 'data', 'events.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dir = path.dirname(DATA_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
};

// Routes
app.get('/api/events.json', async (req, res) => {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If file doesn't exist, return empty array
      res.json([]);
    } else {
      console.error('Error reading events file:', error);
      res.status(500).json({ error: 'Failed to read events data' });
    }
  }
});

app.post('/api/sync', upload.none(), async (req, res) => {
  try {
    await ensureDataDir();
    const data = req.body.data;
    
    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // Create backup of existing file if it exists
    try {
      const stats = await fs.stat(DATA_FILE);
      if (stats.isFile()) {
        const backupFile = `${DATA_FILE}.${Date.now()}.backup`;
        await fs.copyFile(DATA_FILE, backupFile);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error('Error creating backup:', error);
      }
    }

    // Write new data
    await fs.writeFile(DATA_FILE, data);
    res.json({ success: true });
  } catch (error) {
    console.error('Error syncing data:', error);
    res.status(500).json({ error: 'Failed to sync data' });
  }
});

// Fetch data from Google Sheets and return as JSON
app.post('/api/google-sheets', async (req, res) => {
  const { spreadsheetId, range } = req.body;
  if (!spreadsheetId || !range) {
    return res.status(400).json({ error: 'Missing spreadsheetId or range' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets('v4');

    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    const registrants = rows.map(row => ({
      name: row[0],
      email: row[1],
      phone: row[2],
    }));

    res.json(registrants);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
