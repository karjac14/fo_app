import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL
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
var db = firebase.firestore();
var auth = firebase.auth();

export function logIn(email, password) {
  return function (dispatch) {
    auth.signInWithEmailAndPassword(email, password)
      .then(user =>
        dispatch({
          type: LOG_IN_SUCCESS,
          payload: user
        })
      ).catch(error => {
        dispatch({
          type: LOG_IN_FAIL,
          payload: error.message
        })
      });
  };
}

export function signUp(newUser) {
  return function (dispatch) {

    const { f_name, l_name, email, password, country, state, city, zip } = newUser;

    auth.createUserWithEmailAndPassword(email, password)
      .then(user => {

        //save user's other details to db
        db.collection("users").add({
          email,
          f_name,
          l_name,
          country,
          state,
          city,
          zip,
          uid: user.user.uid,
          created_date: new Date()
        })
          .then(function (docRef) {
            //TODO: route user to preference page as a new user
            dispatch({
              type: SIGN_UP_SUCCESS
            })
          })
          .catch(function (error) {
            //TODO: route user back to sign up page and send error
            dispatch({
              type: SIGN_UP_FAIL,
              payload: error.message
            })
          });

      })
      .catch(function (error) {
        //TODO: route user back to sign up page and send error
      });
  };
}

export function logOut() {
  return function (dispatch) {
    auth.signOut()
      .then(() =>
        dispatch({
          type: LOG_OUT_SUCCESS,
          payload: true
        })
      );
  };
}


