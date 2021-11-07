import { GET_ALL_TASK, GET_TASK_BY_ID, GET_TASK_BY_DATE, CREATE_TASK, DELETE_TASK_BY_ID, UPDATE_TASK_BY_ID } from "../actions/type";

const initialState = {
  results: [],
};

export default function task(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TASK:
      return {
        ...state,
        results: action.payload,
      };
    case GET_TASK_BY_ID:
      return {
        ...state,
        results: action.payload,
      };
    case GET_TASK_BY_DATE:
      return {
        ...state,
        results: action.payload,
      };
    case CREATE_TASK:
      return {
        ...state,
      };
    case DELETE_TASK_BY_ID:
      return {
        ...state,
      };
    case UPDATE_TASK_BY_ID:
      return {
        ...state,
      };
    default:
      return state;
  }
}
