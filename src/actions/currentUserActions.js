import {
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SET_AS_AUTH,
  SET_AS_NOT_AUTH,
} from "./currentUserTypes";

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


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
var usersRef = db.collection("users");
var auth = firebase.auth();



export function logIn(email, password) {


  return function (dispatch) {
    auth.signInWithEmailAndPassword(email, password)
      .then(data => {

        let uid = data.user.uid;
        data.user.getIdToken().then(idToken => {
          usersRef.doc(uid).get().then(doc => {
            if (doc.exists) {
              let user = doc.data();
              user.idToken = idToken;
              user.isNewUser = data.additionalUserInfo.isNewUser;
              dispatch({
                type: LOG_IN_SUCCESS,
                payload: user
              })
            } else {
              let user = doc.data();
              user.idToken = idToken;
              user.isNewUser = data.additionalUserInfo.isNewUser;
              dispatch({
                type: LOG_IN_SUCCESS,
                payload: user
              })
            }
          }).catch(function (error) {
            //let the user to login
            //TODO later: inform user to enter their details in account settings
            let user = {}
            user.idToken = idToken;
            dispatch({
              type: LOG_IN_SUCCESS,
              payload: user
            })
          });
        });
      }).catch(error => {

        let errorMessage;

        if (error.code === "auth/user-not-found") {
          errorMessage = "Email provided not found."
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "Invalid password. Please try again"
        } else {
          errorMessage = error.message
        }

        dispatch({
          type: LOG_IN_FAIL,
          payload: errorMessage
        })
      });
  };
}

export function signUp(newUser) {
  return function (dispatch) {

    const { f_name, l_name, email, password, country, state, city, zip } = newUser;

    auth.createUserWithEmailAndPassword(email, password)
      .then(data => {
        let uid = data.user.uid;
        const newUserDetails = {
          email,
          f_name,
          l_name,
          country,
          state,
          city,
          zip,
          uid: data.user.uid,
          created_date: new Date()
        };

        data.user.getIdToken().then(idToken => {
          usersRef.doc(uid).set(newUserDetails)
            .then(function (docRef) {
              newUserDetails.idToken = idToken;
              newUserDetails.isNewUser = true;
              dispatch({
                type: SIGN_UP_SUCCESS,
                payload: newUserDetails
              })
            })
            .catch(function (error) {
              dispatch({
                type: SIGN_UP_FAIL,
                payload: error.message
              })
            });
        });

      }).catch(function (error) {

        let errorMessage;

        if (error.code === "auth/email-already-in-use") {
          errorMessage = "Email provided is already in use."
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email address."
        } else {
          errorMessage = error.message
        }
        dispatch({
          type: SIGN_UP_FAIL,
          payload: errorMessage
        })
      });
  };
}

export function setAsAuth(uid, idToken) {
  return function (dispatch) {

    usersRef.doc(uid).get().then(doc => {
      if (doc.exists) {
        let user = doc.data();
        user.idToken = idToken;
        dispatch({
          type: SET_AS_AUTH,
          payload: user
        })
      } else {
        dispatch({
          type: SET_AS_NOT_AUTH
        })
      }
    }).catch(function (error) {
      dispatch({
        type: SET_AS_NOT_AUTH
      })
    });
  };
}

export function setAsNotAuth() {
  return function (dispatch) {
    dispatch({
      type: SET_AS_NOT_AUTH
    })
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


