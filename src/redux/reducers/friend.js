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
} from "../actions/type";

const initialState = {
  results: [],
  friends: [],
  request: [],
  reqSent: [],
};

export default function friend(state = initialState, action) {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        results: action.payload,
      };
    case SEARCH_FRIEND:
      return {
        ...state,
        results: action.payload,
      };
    case GET_ALL_FRIEND:
      return {
        ...state,
        friends: action.payload,
      };
    case GET_ALL_FRIEND_REQ:
      return {
        ...state,
        request: action.payload,
      };
    case GET_ALL_FRIEND_REQ_SENT:
      return {
        ...state,
        reqSent: action.payload,
      };
    case INVITE_FRIEND:
      return {
        ...state,
      };
    case DELETE_FRIEND:
      return {
        ...state,
      };
    case ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
      };
    case DECLINE_FRIEND_REQUEST:
      return {
        ...state,
      };
    case CLEAR_SEARCH_USER:
      return {
        ...state,
        results: [],
      };
    default:
      return state;
  }
}
