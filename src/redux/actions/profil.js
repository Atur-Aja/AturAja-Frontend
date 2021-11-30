import axios from "axios";
import { Url } from "../../helpers/server";
import { GET_PROFILE, SET_PROFILE, SET_MESSAGE } from "./type";

export function setProfile(fullname, image, phone_number) {
  return (dispatch) => {
    const profile = new FormData();
    profile.append("fullname", fullname);
    profile.append("photo", image);
    profile.append("phone_number", phone_number);

    return axios
      .post(Url.User + "/profile", profile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch({
          type: SET_PROFILE,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: SET_MESSAGE,
          payload: error.response.data.message,
        });
      });
  };
}

export function getProfile() {
  return (dispatch) => {
    const username = localStorage.getItem("username");

    return axios
      .get(Url.User + `/${username}` + "/profile")
      .then((response) => {
        dispatch({
          type: GET_PROFILE,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
