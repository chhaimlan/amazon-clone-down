import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCRk5fjT7PehyzZ2gHkhp98uiJZZrjjjaw",
  authDomain: "instagram-clone-514e1.firebaseapp.com",
  projectId: "instagram-clone-514e1",
  storageBucket: "instagram-clone-514e1.appspot.com",
  messagingSenderId: "1069459254437",
  appId: "1:1069459254437:web:3a137ef3c136e61582b14c",
  measurementId: "G-XLNFH8ZE80",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();
