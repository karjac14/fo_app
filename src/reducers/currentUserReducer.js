import { LOG_IN_SUCCESS, SIGN_UP_SUCCESS, LOG_OUT_SUCCESS, LOG_IN_FAIL, SIGN_UP_FAIL } from '../actions/currentUserTypes';


const initialState = {
    isAuth: false,
    f_name:''
}

const authReducer = function (state = initialState, action) {

    switch (action.type) {
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                isAuth: true
            }
        }
        case LOG_IN_FAIL: {
            return {
                ...state,
                isAuth: false
            }
        }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                isAuth: true
            }
        }
        case SIGN_UP_FAIL: {
            return {
                ...state,
                isAuth: false
            }
        }
        case LOG_OUT_SUCCESS: {
            return {
                isAuth: false
            }
        }
        default:
            return state;
    }
};

export default authReducer;