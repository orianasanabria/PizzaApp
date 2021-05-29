import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB0EL3f7MswnCHceNQJisMABzvEQI3Hf0g",
  authDomain: "pizzeria1902.firebaseapp.com",
  projectId: "pizzeria1902",
  storageBucket: "pizzeria1902.appspot.com",
  messagingSenderId: "733631805866",
  appId: "1:733631805866:web:45ca2ba2b5e992476793d3",
  measurementId: "G-H04CPVG8T4"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore();

export {
  firebaseConfig,
  db
};