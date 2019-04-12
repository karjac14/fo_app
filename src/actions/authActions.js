import {
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  SEND_SIGN_UP_DETAILS
} from "../actions/authTypes";
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyD3kLueJdPx0Ckt2lCpm8MmGjauWzE8cs8",
  authDomain: "fo-db-e5cab.firebaseapp.com",
  databaseURL: "https://fo-db-e5cab.firebaseio.com",
  projectId: "fo-db-e5cab",
  storageBucket: "fo-db-e5cab.appspot.com",
  messagingSenderId: "763871220167"
};
firebase.initializeApp(config);

export function logIn(email, password) {
  return function(dispatch) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user =>
        dispatch({
          type: LOG_IN,
          payload: user
        })
      );
  };
}

export function logOut() {
  return function(dispatch) {
    firebase
      .auth()
      .signOut()
      .then(() =>
        dispatch({
          type: LOG_OUT,
          payload: true
        })
      );
  };
}
