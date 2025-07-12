// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoRgbZDz-_6O0C4NfevgwdckGga3PszXw",
  authDomain: "ugcgenerator-5884a.firebaseapp.com",
  projectId: "ugcgenerator-5884a",
  storageBucket: "ugcgenerator-5884a.firebasestorage.app",
  messagingSenderId: "418020792265",
  appId: "1:418020792265:web:052a2a4458c730035efa18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);

export { db, storage }