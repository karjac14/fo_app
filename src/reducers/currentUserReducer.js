import { LOG_IN_SUCCESS, SIGN_UP_SUCCESS, LOG_OUT_SUCCESS, LOG_IN_FAIL, SIGN_UP_FAIL, SET_AS_AUTH, SET_AS_NOT_AUTH } from '../actions/currentUserTypes';


const initialState = {
    isAuth: null,
    f_name: ''
}

const authReducer = function (state = initialState, action) {

    switch (action.type) {
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                authErrorMessage: null
            }
        }
        case LOG_IN_FAIL: {
            return {
                ...state,
                isAuth: false,
                authErrorMessage: action.payload
            }
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                authErrorMessage: null
            }
        }
        case SIGN_UP_FAIL: {
            return {
                ...state,
                isAuth: false,
                authErrorMessage: action.payload
            }
        }
        case LOG_OUT_SUCCESS: {
            return {
                isAuth: false
            }
        }
        case SET_AS_AUTH: {
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        }
        case SET_AS_NOT_AUTH: {
            return {
                ...state,
                isAuth: false
            }
        }
        default:
            return state;
    }
};

export default authReducer;