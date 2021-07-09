
import firebase from 'firebase/app';


import "firebase/auth";

export const registerUse = ({ email, password }) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
     // var user = userCredential.user;
      // ...
      console.log('register sussefull')
    })
    .catch((error) => {
     // var errorCode = error.code;
      //var errorMessage = error.message;
      // ..
    });
}
