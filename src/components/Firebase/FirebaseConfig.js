// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDIOyDCGVaK9cnHZuhcSnIOT2PcHpVExX8",
  authDomain: "foodapp2-66b08.firebaseapp.com",
  projectId: "foodapp2-66b08",
  storageBucket: "foodapp2-66b08.appspot.com",
  messagingSenderId: "452885592433",
  appId: "1:452885592433:web:4abb28865d9c3e71829ed0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};