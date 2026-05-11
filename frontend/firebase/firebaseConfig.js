// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKfB7MpNdrlxzIIGaeoCC6I0t59t8zV7w",
  authDomain: "iltsmill.firebaseapp.com",
  projectId: "iltsmill",
  storageBucket: "iltsmill.firebasestorage.app",
  messagingSenderId: "612810786101",
  appId: "1:612810786101:web:0bd569c6cd408c9e8cf87c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
