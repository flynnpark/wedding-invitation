import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBcStIb92tRefwQV7pJCglnueVpfW-q0XM',
  authDomain: 'flynnamie-wedding-invitation.firebaseapp.com',
  projectId: 'flynnamie-wedding-invitation',
  storageBucket: 'flynnamie-wedding-invitation.appspot.com',
  messagingSenderId: '11816563940',
  appId: '1:11816563940:web:33c703c1964e51eb8668f1',
  measurementId: 'G-YP2VXLWL37',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
