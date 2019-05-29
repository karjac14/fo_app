import {
  UPDATE_HAS_PREFERENCES, UPDATE_HAS_OPTIONS, UPDATE_HAS_CHOSEN
} from "./progressTypes";





// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';


// var config = {
//   apiKey: "AIzaSyD3kLueJdPx0Ckt2lCpm8MmGjauWzE8cs8",
//   authDomain: "fo-db-e5cab.firebaseapp.com",
//   databaseURL: "https://fo-db-e5cab.firebaseio.com",
//   projectId: "fo-db-e5cab",
//   storageBucket: "fo-db-e5cab.appspot.com",
//   messagingSenderId: "763871220167"
// };
// firebase.initializeApp(config);

// var db = firebase.firestore();
// var usersRef = db.collection("users");
// var auth = firebase.auth();



export function updateHasPreferences(val) {
  return function (dispatch) {
      dispatch({
                type: UPDATE_HAS_PREFERENCES,
                payload: val
              })
  };
}

export function updateHasOptions(val) {
  return function (dispatch) {
      dispatch({
                type: UPDATE_HAS_OPTIONS,
                payload: val
              })
  };
}

export function updateHasChosen(val) {
  return function (dispatch) {
      dispatch({
                type: UPDATE_HAS_CHOSEN,
                payload: val
              })
  };
}
