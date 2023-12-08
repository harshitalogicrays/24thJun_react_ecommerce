// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyA9n4si-Gu6msVJJCOhaOhQHLDyFHFD4a8",
  authDomain: "thjun-ecommerce.firebaseapp.com",
  projectId: "thjun-ecommerce",
  storageBucket: "thjun-ecommerce.appspot.com",
  messagingSenderId: "521368837631",
  appId: "1:521368837631:web:c4f9a41631530846f6dbca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
export default app
