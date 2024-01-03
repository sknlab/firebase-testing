import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD0_NNeirO7jnxLn7y-z_zLxvIxGndrZiw',
  authDomain: 'fir-blogs-b3ace.firebaseapp.com',
  projectId: 'fir-blogs-b3ace',
  storageBucket: 'fir-blogs-b3ace.appspot.com',
  messagingSenderId: '602274096343',
  appId: '1:602274096343:web:f4e9a1916dffb1c8b13c92',
  measurementId: 'G-FVJ8FK7E50',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
