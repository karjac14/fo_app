
import { combineReducers } from 'redux';
import currentUserReducer from './currentUserReducer';
import progressReducer from './progressReducer';



export default combineReducers({
    currentUser: currentUserReducer,
    progress: progressReducer
});