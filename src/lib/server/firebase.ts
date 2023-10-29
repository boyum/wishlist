import { initializeApp, type AppOptions } from "firebase-admin/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getFirestore, collection, Firestore } from "firebase/firestore";

const firebaseConfig: AppOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};

let app: FirebaseApp;
let db: Firestore;
let analytics: Analytics;

if (!app) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  analytics = getAnalytics(app);
}

export { app, db, analytics };

type CollectionName = "wishlists";

/**
 * Returns a Firestore collection object.
 * This can be used to query the database.
 *
 * @param collectionName
 */
export function getCollection(collectionName: CollectionName) {
  return collection(db, collectionName);
}
