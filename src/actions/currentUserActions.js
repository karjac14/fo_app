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
      .then(user => {

        let uid = user.user.uid;

        usersRef.doc(uid).get().then(function (doc) {
          if (doc.exists) {
            let user = doc.data();
            dispatch({
              type: LOG_IN_SUCCESS,
              payload: user
            })
          } else {
            //TODO: Handle if login fails (priority 1)
          }
        }


        ).catch(function (error) {
          console.log("Error getting document:", error);
        });



      }).catch(error => {
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
        let uid = user.user.uid;
        const newUserDetails = {
          email,
          f_name,
          l_name,
          country,
          state,
          city,
          zip,
          uid: user.user.uid,
          created_date: new Date()
        };

        console.log("adding details of " + uid);
        //save user's other details to db
        usersRef.doc(uid).set(newUserDetails)
          .then(function (docRef) {
            //TODO: route user to preference page as a new user
            console.log("success added details");
            dispatch({
              type: SIGN_UP_SUCCESS,
              payload: newUserDetails
            })
          })
          .catch(function (error) {
            //TODO: route user back to sign up page and send error
            console.log("failed adding details");
            dispatch({
              type: SIGN_UP_FAIL,
              payload: error.message
            })
          });

      })
      .catch(function (error) {
        //TODO: route user back to sign up page and send error
        console.log(error);
        console.log("failed adding a user: ");
      });
  };
}

export function setAsAuth(uid) {
  return function (dispatch) {

    usersRef.doc(uid).get().then(function (doc) {
      if (doc.exists) {
        let user = doc.data();
        dispatch({
          type: SET_AS_AUTH,
          payload: user
        })
      } else {
        // doc.data() will be undefined in this case
        console.log("no document for this signedin user!");
        dispatch({
          type: SET_AS_NOT_AUTH
        })
      }
    }


    ).catch(function (error) {
      console.log("Error getting document:", error);
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


