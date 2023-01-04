import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

const { firebaseConfig } = Constants.manifest.extra;

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore();
export const auth = getAuth();
export default app;
