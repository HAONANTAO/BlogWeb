// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log(import.meta.env.VITE_FIREBASE_API_KEY);
// Your web app's Firebase configuration
const firebaseConfig = {
  //in env file
  apiKey: "AIzaSyCwbGYnI2STlGj811rJWAD_2Tj4tNuYFFc",
  authDomain: "mern-blog-41d55.firebaseapp.com",
  projectId: "mern-blog-41d55",
  storageBucket: "mern-blog-41d55.appspot.com",
  messagingSenderId: "837394525739",
  appId: "1:837394525739:web:d2c51859ce4ed6f1bf046e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
