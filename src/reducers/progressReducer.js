import { UPDATE_HAS_PREFERENCES, UPDATE_HAS_OPTIONS, UPDATE_HAS_CHOSEN } from '../actions/progressTypes';


const initialState = {
    hasPreferences: false, //if user have set preferences 
    hasChosen: false, //if user had chosen meals for the week
}

const progressReducer = function (state = initialState, action) {

    switch (action.type) {
        case UPDATE_HAS_PREFERENCES: {
            return {
                ...state,
                hasPreferences: action.payload
            }
        }
        case UPDATE_HAS_OPTIONS: {
            return {
                ...state,
                hasChosen: action.payload
            }
        }
        default:
            return state;
    }
};

export default progressReducer;