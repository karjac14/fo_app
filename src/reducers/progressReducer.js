import { UPDATE_HAS_PREFERENCES, UPDATE_HAS_CHOSEN, FETCHING_STATUS, FETCHED_STATUS } from '../actions/progressTypes';


const initialState = {}

const progressReducer = function (state = initialState, action) {

    switch (action.type) {
        case FETCHING_STATUS: {
            return {
                ...state,
                fetchingStatus: true
            }
        }
        case FETCHED_STATUS: {
            return {
                ...state,
                fetchingStatus: false,
                fetchedStatus: true
            }
        }
        case UPDATE_HAS_PREFERENCES: {
            return {
                ...state,
                hasPreferences: action.payload
            }
        }
        case UPDATE_HAS_CHOSEN: {
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