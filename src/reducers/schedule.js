import { GET_USER_SCHEDULE } from "../actions/type";

const initialState = {};

export default function schedule(state = initialState, action) {
  switch(action.type) {
    case GET_USER_SCHEDULE:
      return {
        schedule: action.payload,
      }
    default:
      return state;
  }
}