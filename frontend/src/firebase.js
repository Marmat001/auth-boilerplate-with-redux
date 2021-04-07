import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCHey2W-ozRqKKgbQ8g7N7tJ9UM8_uTcZY",
  authDomain: "authentication-boilerpla-df8f9.firebaseapp.com",
  projectId: "authentication-boilerpla-df8f9",
  storageBucket: "authentication-boilerpla-df8f9.appspot.com",
  messagingSenderId: "485585187345",
  appId: "1:485585187345:web:437255dbca1321123cf7b0"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();