import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_WEB_API_KEY,
  authDomain: 'my-nannies-project.firebaseapp.com',
  databaseURL:
    'https://my-nannies-project-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'my-nannies-project',
  storageBucket: 'my-nannies-project.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_WEB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_WEB_APP_ID,
  measurementId: 'G-VPWNGCEWNF',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
