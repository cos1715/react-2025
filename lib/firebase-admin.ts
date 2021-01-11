import * as admin from 'firebase-admin';
import 'firebase/auth';
import 'firebase/functions';
import 'firebase/firestore';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
// try {
//   firebase.initializeApp(firebaseConfig);
// } catch (err) {
//   if (!/already exists/.test(err.message)) {
//     console.error('Firebase initialization error', err.stack);
//   }
// }

export const auth = admin.auth();
export const db = admin.firestore();