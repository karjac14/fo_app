import axios from 'axios';
import store from '../store';
import { host } from '../config';

const foHttp = async (method, path, params={}) => {

  const currentUser = store.getState().currentUser;
  const {isAuth, idToken, uid} = currentUser;

  if (!isAuth) {
    return;
  }

  let url = host + path + "/";
  params.uid = uid;

  let payload = {
    params,
    headers :{
      authorization : 'Bearer ' + idToken
    }
  }

  switch (method) {
    
    case "GET": {
      await axios.get(url, payload)
        .then(res => {
          return res;
        }).catch(err => {
          return err;
        });
    }
    case "POST": {
      await axios.get(url, payload)
      .then(res => {
        return res;
      }).catch(err => {
        return err;
      });
    }
    case "PUT": {
      await axios.get(url, payload)
      .then(res => {
        return res;
      }).catch(err => {
        return err;
      });
    }
    case "DELETE": {
      await axios.get(url, payload)
      .then(res => {
        return res;
      }).catch(err => {
        return err;
      });
    }
    default:
      return {error: "unknown http method"};
  }
}

export default foHttp;