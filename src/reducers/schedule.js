import {
  GET_ALL_SCHEDULE,
  GET_SCHEDULE_BY_DATE,
  CREATE_SCHEDULE,
  DELETE_SCHEDULE_BY_ID,
  GET_SCHEDULE_BY_ID,
  UPDATE_SCHEDULE_BY_ID,
} from "../actions/type";

const initialState = {
  selectedSchedule: {},
  results: [],
};

export default function schedule(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SCHEDULE:
      return {
        ...state,
        results: action.payload,
      };
    case GET_SCHEDULE_BY_ID:
      return {
        ...state,
        selectedSchedule: action.payload,
      };
    case GET_SCHEDULE_BY_DATE:
      return {
        ...state,
        results: action.payload,
      };
    case CREATE_SCHEDULE:
      return {
        ...state,
      };
    case DELETE_SCHEDULE_BY_ID:
      return {
        ...state,
      };
    case UPDATE_SCHEDULE_BY_ID:
      return {
        ...state,
      };
    default:
      return state;
  }
}
