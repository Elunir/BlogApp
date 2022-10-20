// Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvnlJ4JKKElXi04C5Rnyk21hJfYIq3NBE",
  authDomain: "blogapp-b1ba1.firebaseapp.com",
  projectId: "blogapp-b1ba1",
  storageBucket: "blogapp-b1ba1.appspot.com",
  messagingSenderId: "774434673741",
  appId: "1:774434673741:web:585e0d2eb69a4de5337804"
};

// Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase};