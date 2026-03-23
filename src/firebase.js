import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVh3H9wXZBs5dZ1eQ_SJR1Kr66pvFH0V8",
  authDomain: "adityadryfruits-82dfa.firebaseapp.com",
  projectId: "adityadryfruits-82dfa",
  storageBucket: "adityadryfruits-82dfa.firebasestorage.app",
  messagingSenderId: "561391764549",
  appId: "1:561391764549:web:473a9aed10dd1dd2404f2c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();