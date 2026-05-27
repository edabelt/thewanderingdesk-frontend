import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {

  apiKey:
    "AIzaSyDC4FnBW9fwkHTaJcmiGNGsnxYWJHWKLw8",

  authDomain:
    "the-wandering-desk.firebaseapp.com",

  projectId:
    "the-wandering-desk",

  storageBucket:
    "the-wandering-desk.firebasestorage.app",

  messagingSenderId:
    "1079334959762",

  appId:
    "1:1079334959762:web:25a356932fe5b25e3d844b"

};

const app =
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const googleProvider =
  new GoogleAuthProvider();