import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, get, onValue, serverTimestamp } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDNPEKXKVleCJlst3eErmS12-WUK3xEGyQ",
  authDomain: "pizza-tracker-7a851.firebaseapp.com",
  databaseURL: "https://pizza-tracker-7a851-default-rtdb.firebaseio.com",
  projectId: "pizza-tracker-7a851",
  storageBucket: "pizza-tracker-7a851.appspot.com", // ✅ fixed
  messagingSenderId: "118026448010",
  appId: "1:118026448010:web:507de6e64a0a873c3f9173",
  measurementId: "G-DCFRT30P1S"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, get, onValue, serverTimestamp };
