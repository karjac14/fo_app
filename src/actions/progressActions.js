import {
  UPDATE_HAS_PREFERENCES, UPDATE_HAS_CHOSEN, FETCHING_STATUS, FETCHED_STATUS
} from "./progressTypes";
import foHttp from '../helpers/fohttp';


export const getStatus = (params) => {

  return dispatch => {

    dispatch({
      type: FETCHING_STATUS
    });

    foHttp("GET", "status", params).then(res => {

      dispatch({
        type: FETCHED_STATUS
      });

      if (res.success) {
        if (res.data.hasChosen) {
          dispatch({
            type: UPDATE_HAS_CHOSEN,
            payload: true
          })
          dispatch({
            type: UPDATE_HAS_PREFERENCES,
            payload: true
          })
        } else if (res.data.hasPreferences) {
          dispatch({
            type: UPDATE_HAS_PREFERENCES,
            payload: true
          })
        }
      }
    })
  };
}



export const updateHasPreferences = (val) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_HAS_PREFERENCES,
      payload: val
    })
  };
}

export const updateHasChosen = (val) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_HAS_CHOSEN,
      payload: val
    })
  };
}




