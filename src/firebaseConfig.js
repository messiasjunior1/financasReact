import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyDa5sIkSE7xmUCX2FfqUcfGFusWge0DDBY",
    authDomain: "reactfinancas.firebaseapp.com",
    databaseURL: "https://reactfinancas-default-rtdb.firebaseio.com",
    projectId: "reactfinancas",
    storageBucket: "reactfinancas.appspot.com",
    messagingSenderId: "1094335150851",
    appId: "1:1094335150851:web:f5f0ebc3a3d303b1938736"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig)
  }
  export default firebase;