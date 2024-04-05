// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { ENV } from "../utlils/envGetter";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: ENV.VITE_APIKEY,
    authDomain: ENV.VITE_AUTHDOMAIN,
    projectId: ENV.VITE_PROJECTID,
    storageBucket: ENV.VITE_STORAGEBUCKET,
    messagingSenderId: ENV.VITE_MESSAGINGSENDERID,
    appId: ENV.VITE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreDb = getFirestore(app)
