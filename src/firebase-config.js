// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvgQqj3IAe77N-qmqHtKL20DQ61ApMqE4",
  authDomain: "websitebanhang-3d9a4.firebaseapp.com",
  projectId: "websitebanhang-3d9a4",
  storageBucket: "websitebanhang-3d9a4.appspot.com",
  messagingSenderId: "533500890600",
  appId: "1:533500890600:web:7f95d7c87e11d0ad1fa85d",
  measurementId: "G-DXS8KJ92Z0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {db,auth};