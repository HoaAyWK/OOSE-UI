// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz_rmy08LsjR-jpSj6MvLvnGHMud9py-c",
  authDomain: "open-request-a7e7b.firebaseapp.com",
  projectId: "open-request-a7e7b",
  storageBucket: "open-request-a7e7b.appspot.com",
  messagingSenderId: "446801038648",
  appId: "1:446801038648:web:65c967e436896123e685cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storeage = getStorage(app);

