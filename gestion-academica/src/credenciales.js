// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTPTjRDWR3hNoW0EjmWPr8FxF-gYjQDB8",
  authDomain: "base-plataforma-notas.firebaseapp.com",
  projectId: "base-plataforma-notas",
  storageBucket: "base-plataforma-notas.firebasestorage.app",
  messagingSenderId: "877231384550",
  appId: "1:877231384550:web:a3dc0e4ad019e752941827"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;