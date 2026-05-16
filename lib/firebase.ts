import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAtvb0b4fxKlX9ErDYFMTCH34XAkfkDSpU",
  authDomain: "hyperbyte-gaming.firebaseapp.com",
  projectId: "hyperbyte-gaming",
  storageBucket: "hyperbyte-gaming.firebasestorage.app",
  messagingSenderId: "726156129020",
  appId: "1:726156129020:web:ac8a6093a2648bcbf81d79",
  measurementId: "G-T82HKJ0MMF"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)