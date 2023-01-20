import firebase from'firebase/app';
import'firebase/firestore'
import'firebase/auth'


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmooPee88QyYEDJXQSPt8KIG7oRNnH8zM",
  authDomain: "react-app-curso-dbcdb.firebaseapp.com",
  projectId: "react-app-curso-dbcdb",
  storageBucket: "react-app-curso-dbcdb.appspot.com",
  messagingSenderId: "297633379726",
  appId: "1:297633379726:web:88f6c9a1ac485c02d0e0df"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export {
    db,
    googleAuthProvider,
    firebase,
    firebaseConfig
}