import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVnaaYaSmkq_HCBzfZmczXkNwXRpT8Yks",
  authDomain: "nourish-connect.firebaseapp.com",
  projectId: "nourish-connect",
  storageBucket: "nourish-connect.appspot.com",
  messagingSenderId: "527810941963",
  appId: "1:527810941963:web:284bf9f463ef2253f9e30e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);