import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Constants from 'expo-constants'

const { firebaseConfig } = Constants.manifest.extra

const app = initializeApp(firebaseConfig);

export const db = getFirestore()
export const auth = getAuth()
export default app