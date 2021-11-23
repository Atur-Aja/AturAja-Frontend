import { GET_PROFILE } from "../actions/type";

const initialState = {
  results: {},
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        results: action.payload,
      };
    default:
      return state;
  }
}
