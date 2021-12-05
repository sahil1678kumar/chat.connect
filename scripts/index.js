import {initializeApp} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
    getFirestore, collection,
    addDoc,
    onSnapshot,
    query, where,
    orderBy,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBBtYrAIuLPZcDjPZfYL9lZ2Il-rFhezIk",
    authDomain: "chat-room-f5e38.firebaseapp.com",
    projectId: "chat-room-f5e38",
    storageBucket: "chat-room-f5e38.appspot.com",
    messagingSenderId: "563664615922",
    appId: "1:563664615922:web:32bff395a2a02160f2136b"
  };

initializeApp(firebaseConfig);
