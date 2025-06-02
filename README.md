# YJCC Events - מערכת ניהול אירועים

<div dir="rtl">

## מערכת ניהול אירועים של הקהילה הישראלית הצעירה בפראג

מערכת זו פותחה עבור YJCC (Young Israeli Community in Prague) לניהול אירועים קהילתיים. המערכת מאפשרת למנהלים ליצור ולנהל אירועים, לעקוב אחר משתתפים, ולנהל תשלומים.

### תכונות עיקריות
- ✨ ממשק משתמש בעברית עם תמיכה מלאה ב-RTL
- 📅 יצירה וניהול של אירועים
- 👥 מעקב אחר משתתפים
- 💰 ניהול תשלומים בקרונות צ'כיים
- 📱 תמיכה בשליחת הודעות WhatsApp
- 📊 סטטיסטיקות ודוחות

### דרישות מערכת
- Node.js 14.0 ומעלה
- npm או yarn

### התקנה

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

### הגדרות סביבה
יש ליצור קובץ `.env` בתיקיית הפרויקט עם הפרמטרים הבאים:
```
REACT_APP_ADMIN_CODE=291147
```

### שימוש
1. גישה למערכת כמנהל:
   - הכנס לדף הראשי
   - לחץ על "כניסת מנהל"
   - הזן את קוד המנהל

2. יצירת אירוע חדש:
   - לחץ על כפתור ה-+ בפינה
   - מלא את פרטי האירוע
   - לחץ על "צור"

3. ניהול משתתפים:
   - לחץ על מספר המשתתפים באירוע
   - הוסף משתתפים חדשים
   - סמן תשלום, אישור הגעה ונוכחות

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
```

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