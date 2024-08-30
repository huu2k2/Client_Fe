import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from "./firebaseConfig";
const messaging = getMessaging(firebaseApp);
export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BAXdf3eGaT2cSbwndZE3zrRJdK4uFVpigUGsgXu90OUfxJTCxfDR9BhCppf4AHqAepeRzhNBk-G9DMsBYWZi5d8",
    });

    if (token) {
      console.log("User notification token:", token);
    } else {
      console.log(
        "No notification token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
};
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage((payload) => {
        resolve(payload);
      });
    });