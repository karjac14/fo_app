import { LOG_IN, LOG_OUT, SIGN_UP, SEND_SIGN_UP_DETAILS } from '../actions/authTypes';
import * as firebase from "firebase";

export function logIn(email, password) {
    return function (dispatch) {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => dispatch({
                type: LOG_IN,
                payload: user
            }));
    }
}
