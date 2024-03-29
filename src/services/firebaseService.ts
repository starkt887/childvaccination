// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVWPwg5ULlXUgV1gP3KyxRTQeEQUEvccE",
    authDomain: "childvaccination-9fba7.firebaseapp.com",
    projectId: "childvaccination-9fba7",
    storageBucket: "childvaccination-9fba7.appspot.com",
    messagingSenderId: "737876463873",
    appId: "1:737876463873:web:a68dc56778d21043ae8b00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreDb = getFirestore(app)
