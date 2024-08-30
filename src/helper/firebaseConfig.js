import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyCxrt4QEedK9O2YuQoPocwCjOgZNqeTlaQ",
  authDomain: "aloper-b0413.firebaseapp.com",
  projectId: "aloper-b0413",
  storageBucket: "aloper-b0413.appspot.com",
  messagingSenderId: "391723102335",
  appId: "1:391723102335:web:27653eb95fbbd5e55b4f4a",
  measurementId: "G-5PF5SRWRJ8",
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export { messaging };
