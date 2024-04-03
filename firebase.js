import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyDukGl-6c2HfKaKie0FGJzWGeCBF-5hjsU",
    authDomain: "kambio-67f17.firebaseapp.com",
    projectId: "kambio-67f17",
    storageBucket: "kambio-67f17.appspot.com",
    messagingSenderId: "205221704558",
    appId: "1:205221704558:web:191ca7e10328d6abb9077f"
 
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
export default db;

