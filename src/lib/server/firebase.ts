import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      clientEmail: import.meta.env.VITE_FIREBASE_CLIENT_EMAIL,
      privateKey: import.meta.env.VITE_FIREBASE_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n",
      ),
    }),
  });
}

const db = admin.firestore();

export { db };

type CollectionName = "wishlists";

/**
 * Returns a Firestore collection object.
 * This can be used to query the database.
 *
 * @param collectionName
 */
export function getCollection<TType>(collectionName: CollectionName) {
  return db.collection(
    collectionName,
  ) as admin.firestore.CollectionReference<TType>;
}
