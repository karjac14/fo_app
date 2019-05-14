import axios from 'axios';
import store from '../store';
import { host } from '../config';

const foHttp = async (method, path, params = {}) => {

  const currentUser = store.getState().currentUser;
  const { isAuth, idToken, uid } = currentUser;

  if (!isAuth) {
    return;
  }

  let url = host + path + "/";
  params.uid = uid;





  switch (method) {

    case "GET": {

      let payload = {
        params,
        headers: {
          authorization: 'Bearer ' + idToken
        }
      }

      return await axios.get(url, payload)
        .then(res => {
          res.success = true;
          return res;
        }).catch(err => {
          let res = {
            success : false,
            errorMessage: err
          }
          return res;
        });
    }

    case "POST": {

      let payload = params;
      let config = {
        headers: {
          authorization: 'Bearer ' + idToken
        }
      }
      return await axios.post(url, payload, config)
        .then(res => {
          return res;
        }).catch(err => {
          let res = {
            success : false,
            errorMessage: err
          }
          return res;
        });
    }

    case "PUT": {
      let payload = params;
      return await axios.put(url, payload)
        .then(res => {
          return res;
        }).catch(err => {
          let res = {
            success : false,
            errorMessage: err
          }
          return res;
        });
    }

    case "DELETE": {
      let payload = params;
      return await axios.delete(url, payload)
        .then(res => {
          return res;
        }).catch(err => {
          let res = {
            success : false,
            errorMessage: err
          }
          return res;
        });
    }

    default:
      return { error: "unknown http method" };
  }
}

export default foHttp;