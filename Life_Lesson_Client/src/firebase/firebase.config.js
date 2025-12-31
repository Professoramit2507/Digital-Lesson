// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeXWKJ1qL8FSp3R8S7Uwl6LSSp0oOWKRQ",
  authDomain: "digitallesson-1ead2.firebaseapp.com",
  projectId: "digitallesson-1ead2",
  storageBucket: "digitallesson-1ead2.firebasestorage.app",
  messagingSenderId: "701692323218",
  appId: "1:701692323218:web:3545898c755f2ec4e68d4b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);