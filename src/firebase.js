import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; 


const firebaseConfig = {
  apiKey: "AIzaSyDNPEKXKVleCJlst3eErmS12-WUK3xEGyQ",
  authDomain: "pizza-tracker-7a851.firebaseapp.com",
  projectId: "pizza-tracker-7a851",
  storageBucket: "pizza-tracker-7a851.firebasestorage.app",
  messagingSenderId: "118026448010",
  appId: "1:118026448010:web:a5db0044563fff223f9173",
  measurementId: "G-YC5P9X60HH"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export { db, collection, getDocs, addDoc, serverTimestamp };  

