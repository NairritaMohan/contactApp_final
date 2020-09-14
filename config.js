import * as firebase from 'firebase';
require('@firebase/firestore')


var firebaseConfig = {
    apiKey: "AIzaSyDVi2ztHHqUgnlExYiVyqNUTP4jCYovpXU",
    authDomain: "contactapp-98d9a.firebaseapp.com",
    databaseURL: "https://contactapp-98d9a.firebaseio.com",
    projectId: "contactapp-98d9a",
    storageBucket: "contactapp-98d9a.appspot.com",
    messagingSenderId: "717901902169",
    appId: "1:717901902169:web:5f6b179024463746161c48",
    measurementId: "G-01VZ7VMKXR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);




export default firebase.firestore()