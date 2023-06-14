// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbEBYEFtRo3KPTNjhFcN4bEW2EznT_MzI",
  authDomain: "vereda-co-in.firebaseapp.com",
  projectId: "vereda-co-in",
  storageBucket: "vereda-co-in.appspot.com",
  messagingSenderId: "818935652450",
  appId: "1:818935652450:web:a974a3b46bd3990aaf713b",
  measurementId: "G-4JB454SM8Y"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireBaseApp);

export default fireBaseApp;