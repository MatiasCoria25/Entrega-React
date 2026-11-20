import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyDcnQ0HRHR3Us19Myz0x_M4-e3Y4L53z6c",
  authDomain: "arcadia-be6bc.firebaseapp.com",
  projectId: "arcadia-be6bc",
  storageBucket: "arcadia-be6bc.firebasestorage.app",
  messagingSenderId: "697504073559",
  appId: "1:697504073559:web:ec2e4566f0bd624c386012"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); 