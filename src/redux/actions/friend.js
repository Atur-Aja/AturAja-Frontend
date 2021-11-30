import axios from "axios";
import { Url } from "../../helpers/server";
import {
  SEARCH_USER,
  CLEAR_SEARCH_USER,
  SEARCH_FRIEND,
  GET_ALL_FRIEND,
  GET_ALL_FRIEND_REQ,
  GET_ALL_FRIEND_REQ_SENT,
  INVITE_FRIEND,
  DELETE_FRIEND,
  ACCEPT_FRIEND_REQUEST,
  DECLINE_FRIEND_REQUEST,
} from "./type";

export function searchUser(name) {
  return (dispatch) => {
    return axios
      .get(Url.User + `/search?username=${name}`)
      .then((response) => {
        dispatch({
          type: SEARCH_USER,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function searchFriend(username) {
  return (dispatch) => {
    return axios
      .post(Url.User + "/friends", { username })
      .then((response) => {
        dispatch({
          type: SEARCH_FRIEND,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getAllFriend() {
  return (dispatch) => {
    return axios
      .get(Url.User + "/friends")
      .then((response) => {
        dispatch({
          type: GET_ALL_FRIEND,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getAllFriendReq() {
  return (dispatch) => {
    return axios
      .get(Url.User + "/friendsreq")
      .then((response) => {
        dispatch({
          type: GET_ALL_FRIEND_REQ,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getAllFriendReqSent() {
  return (dispatch) => {
    return axios
      .get(Url.User + "/friendsreqsent")
      .then((response) => {
        dispatch({
          type: GET_ALL_FRIEND_REQ_SENT,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function inviteFriend(user_id) {
  return (dispatch) => {
    return axios
      .post(Url.Friend + "/invite", { user_id })
      .then(() => {
        dispatch({
          type: INVITE_FRIEND,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteFriend(user_id) {
  return (dispatch) => {
    return axios
      .delete(Url.Friend + "/delete", { data: { user_id: user_id } })
      .then(() => {
        dispatch({
          type: DELETE_FRIEND,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function acceptRequest(user_id) {
  return (dispatch) => {
    return axios
      .post(Url.Friend + "/accept", { user_id })
      .then(() => {
        dispatch({
          type: ACCEPT_FRIEND_REQUEST,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function declineRequest(user_id) {
  return (dispatch) => {
    return axios
      .post(Url.Friend + "/decline", { user_id })
      .then(() => {
        dispatch({
          type: DECLINE_FRIEND_REQUEST,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export const clearSearch = () => ({
  type: CLEAR_SEARCH_USER,
});
