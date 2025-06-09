# YJCC Events - מערכת ניהול אירועים

<div dir="rtl">

## 🌟 מבט כללי

YJCC Events היא מערכת ניהול אירועים שפותחה במיוחד עבור הקהילה הישראלית הצעירה בפראג (YJCC). המערכת מאפשרת ניהול קל ונוח של אירועים קהילתיים, רישום משתתפים, ומעקב אחר נתונים סטטיסטיים.

## 🚀 תכונות עיקריות

### למנהלים
- ✨ יצירה ועריכה של אירועים
- 📊 סטטיסטיקות מפורטות
- 👥 ניהול משתתפים
- 📈 ייצוא וייבוא נתונים
- 💬 משוב ודירוגים
- 📱 ממשק מותאם למובייל

### למשתתפים
- 🎫 הרשמה קלה לאירועים
- ⭐ מערכת מועדפים
- 🔍 חיפוש וסינון אירועים
- 📲 שיתוף באמצעות WhatsApp
- ⭐ מתן משוב ודירוג
- 📅 תצוגת רשימה/לוח שנה

## 🛠 טכנולוגיות

- React.js
- Material-UI (MUI)
- LocalStorage לשמירת נתונים
- WhatsApp Web API לתקשורת
- Responsive Design

## 📦 התקנה

1. התקן את Node.js (גרסה 14 ומעלה)
2. שכפל את הפרויקט:
   ```bash
   git clone https://github.com/your-username/yjcc-events.git
   ```
3. התקן את החבילות הנדרשות:
   ```bash
   cd yjcc-events
   npm install
   ```
4. הפעל את הפרויקט:
   ```bash
   npm start
   ```

## 🔧 הגדרות

### קוד מנהל
- קוד ברירת המחדל: `291147`
- ניתן לשנות את הקוד בקובץ `App.js`:
  ```javascript
  const ADMIN_CODE = 'your-new-code';
  ```

### התאמת עיצוב
- צבעי המותג מוגדרים ב-`YJCC_COLORS`:
  ```javascript
  const YJCC_COLORS = {
    primary: '#64B5F6',    // כחול בהיר
    secondary: '#90CAF9',  // תכלת
    // ...
  };
  ```

## 📱 תמיכה במובייל

המערכת מותאמת באופן מלא למכשירים ניידים עם:
- תצוגה רספונסיבית
- ממשק מותאם למגע
- אינטגרציה עם WhatsApp
- התאמה לכל גודל מסך

## 📊 ייצוא נתונים

המערכת תומכת בייצוא נתונים בשני פורמטים:
1. **JSON** - לגיבוי מלא של המערכת
2. **CSV** - לניתוח בתוכנות אקסל

## 📈 סטטיסטיקות

המערכת מספקת נתונים סטטיסטיים מפורטים:
- מספר משתתפים כולל
- אירועים פופולריים
- מיקומים מועדפים
- ניתוח מגמות לאורך זמן

## 🔒 אבטחה

- הגנה על גישת מנהל באמצעות קוד
- שמירת נתונים מאובטחת
- הצפנת מידע רגיש
- הרשאות מדורגות

## 🤝 תרומה לפרויקט

נשמח לקבל תרומות לפרויקט! אנא:
1. צור fork של הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📝 רישיון

מופץ תחת רישיון MIT. ראה `LICENSE` למידע נוסף.

## 📞 תמיכה

לשאלות ותמיכה:
- 📧 Email: support@yjcc.cz
- 💬 WhatsApp: +972-54-223-0342

</div>

## YJCC Events Management System (English)

This system was developed for YJCC (Young Israeli Community in Prague) to manage community events. It allows administrators to create and manage events, track participants, and handle payments.

### Key Features
- ✨ Hebrew UI with full RTL support
- 📅 Event creation and management
- 👥 Participant tracking
- 💰 Payment management in Czech Crowns
- 📱 WhatsApp message integration
- 📊 Statistics and reports

### System Requirements
- Node.js 14.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/yjcc-events.git

# Navigate to project directory
cd yjcc-events

# Install dependencies
npm install

# Start the development server
npm start
```

### Environment Setup
Create a `.env` file in the project root with:
```
REACT_APP_ADMIN_CODE=291147
GOOGLE_SERVICE_ACCOUNT_KEY=path/to/service-account.json
```

The `GOOGLE_SERVICE_ACCOUNT_KEY` variable should point to a Google service
account JSON file that has read access to the relevant Google Sheets. This is
required for the server to import registrant data from Google Docs/Sheets.

### Internet Sync & Google Docs Import
The server exposes an endpoint `/api/google-sheets` which retrieves registrant
data from a Google Sheet. When adding participants you can import data directly
from Google Docs/Sheets and it will automatically sync over the internet.

### Usage
1. Admin Access:
   - Go to main page
   - Click "Admin Login"
   - Enter admin code

2. Create New Event:
   - Click + button
   - Fill event details
   - Click "Create"

3. Manage Participants:
   - Click participant count
   - Add new participants
   - Mark payments, confirmations, and attendance

### Technical Stack
- React 18
- Material-UI (MUI)
- Emotion for styling
- Local Storage for data persistence

### Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contact
For support or questions, please contact YJCC administration via WhatsApp.

yjcc-events/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── vercel.json
└── .gitignore 
