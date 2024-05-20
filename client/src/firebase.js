// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "moiz-blog.firebaseapp.com",
  projectId: "moiz-blog",
  storageBucket: "moiz-blog.appspot.com",
  messagingSenderId: "1017288510565",
  appId: "1:1017288510565:web:473de72e354e394684ca8c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
