import axios from "axios";
import { Url } from "../../helpers/server";
import { REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SET_MESSAGE } from "./type";

export function register(username, email, password, password_validate, phone_number) {
  return (dispatch) => {
    return axios
      .post(Url.Register, {
        username,
        email,
        password,
        password_validate,
        phone_number,
      })
      .then(
        (response) => {
          dispatch({
            type: REGISTER_SUCCESS,
          });
          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });
          return Promise.resolve();
        },
        (error) => {
          dispatch({
            type: REGISTER_FAILED,
          });
          dispatch({
            type: SET_MESSAGE,
            payload: error.response.data.message,
          });
          console.log("error bosq = ", error.response.data.message);
          return Promise.reject();
        }
      );
  };
}

export function login(login, password) {
  return (dispatch) => {
    return axios
      .post(Url.Login, { login, password })
      .then((response) => {
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILED,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: error.response.data.message,
        });
        console.log("error bosq = ", error.response.data.message);
        return Promise.reject();
      });
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
