import { getToken } from 'firebase/messaging';
import { messaging } from './firebaseConfig';

export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "YOUR_VAPID_KEY", // Bạn sẽ nhận được từ Firebase Console
    });

    if (token) {
      console.log('User notification token:', token);
    } else {
      console.log('No notification token available. Request permission to generate one.');
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
  }
};
