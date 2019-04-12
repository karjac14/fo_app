import { LOG_IN, LOG_OUT, SIGN_UP, SEND_SIGN_UP_DETAILS } from '../actions/authTypes';


const initialState = {
    isAuth: false,
}

const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case 'LOG_IN': {
            return {
                ...state,
                user: action.payload.user,
                isAuth: true
            }
        }
        default:
            return state;
    }
};

export default authReducer;