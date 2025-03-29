// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzk6PwrgnsM5X_jmAHvR19gF0yewM2TUQ",
  authDomain: "perfume-ecommerce-576ca.firebaseapp.com",
  projectId: "perfume-ecommerce-576ca",
  storageBucket: "perfume-ecommerce-576ca.firebasestorage.app",
  messagingSenderId: "944892131960",
  appId: "1:944892131960:web:7213379791760969d24b8d",
  measurementId: "G-MPZLF4VL3G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
