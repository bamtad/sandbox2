import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyClDUEjxRLuJV1rMzd18A7v088xQM7GHF4",
    authDomain: "netflix-clone-131b0.firebaseapp.com",
    projectId: "netflix-clone-131b0",
    storageBucket: "netflix-clone-131b0.firebasestorage.app",
    messagingSenderId: "1065996584312",
    appId: "1:1065996584312:web:c1ca02b49fc54cb9b8348d"
  };
  
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   onAuthStateChanged };
export default db;


