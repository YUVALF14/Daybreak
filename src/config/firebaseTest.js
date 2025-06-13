import { ref, set, get } from "firebase/database";
import { database } from "./firebaseConfig.js";

// כתיבת נתונים לבדיקה
set(ref(database, 'test/data'), { message: "Hello Firebase!" })
  .then(() => {
    // קריאת נתונים
    return get(ref(database, 'test/data'));
  })
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log("✅ Firebase עובד! נתונים:", snapshot.val());
    } else {
      console.log("❌ אין נתונים זמינים.");
    }
  })
  .catch((error) => {
    console.error("שגיאה בגישה ל-Firebase:", error);
  });
