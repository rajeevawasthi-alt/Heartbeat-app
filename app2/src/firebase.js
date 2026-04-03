import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUAgZrmTNL11I3lqxzGNjZHXdhnSMJ5lU",
    authDomain: "heartbeat-3a4a2.firebaseapp.com",
    projectId: "heartbeat-3a4a2",
    storageBucket: "heartbeat-3a4a2.firebasestorage.app",
    messagingSenderId: "460283273290",
    appId: "1:460283273290:web:c048f5b9a705d82f9cc6b3",
    measurementId: "G-TVXE0Z3XCD"
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);