import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'; 


const firebaseConfig = {
  apiKey: process."AIzaSyCsV81XXaoR4GVtjrCvqnj7HN0DSEcCMNc",
  authDomain: "pizza-sales-tracker.firebaseapp.com",
  projectId: "pizza-sales-tracker",
  storageBucket: "pizza-sales-tracker.appspot.com",
  messagingSenderId: "95670003992",
  appId: "1:95670003992:web:e8e6d6806c7ba999fd166d",
  measurementId: "G-2D49Z3Z06M"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export { db, collection, getDocs, addDoc, serverTimestamp };  

