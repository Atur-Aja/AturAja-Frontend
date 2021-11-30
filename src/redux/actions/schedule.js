import axios from "axios";
import { apiUrl } from "../../helpers/config";
import { Url } from "../../helpers/server";
import {
  GET_ALL_SCHEDULE,
  GET_SCHEDULE_BY_DATE,
  CREATE_SCHEDULE,
  DELETE_SCHEDULE_BY_ID,
  GET_SCHEDULE_BY_ID,
  UPDATE_SCHEDULE_BY_ID,
  MATCH_SCHEDULE,
} from "./type";

export function getAllSchedule() {
  return (dispatch) => {
    return axios
      .get(apiUrl + `/user/schedules`)
      .then((response) => {
        dispatch({
          type: GET_ALL_SCHEDULE,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getScheduleById(id) {
  return (dispatch) => {
    return axios
      .get(Url.Schedule + `/${id}`)
      .then((response) => {
        const schedule = response?.data || {};
        dispatch({
          type: GET_SCHEDULE_BY_ID,
          payload: schedule,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getScheduleByDate(date) {
  return (dispatch) => {
    return axios
      .post(Url.Dashboard + "/schedule", { date })
      .then((response) => {
        dispatch({
          type: GET_SCHEDULE_BY_DATE,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function createSchedule(title, description, location, start_date, end_date, start_time, end_time, repeat, notification, friends) {
  return (dispatch) => {
    return axios
      .post(Url.Schedule, {
        title,
        description,
        location,
        start_date,
        end_date,
        start_time,
        end_time,
        repeat,
        notification,
        friends,
      })
      .then(() => {
        dispatch({
          type: CREATE_SCHEDULE,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteScheduleById(id) {
  return (dispatch) => {
    return axios
      .delete(Url.Schedule + `/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_SCHEDULE_BY_ID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateScheduleById(id, title, description, location, start_date, end_date, start_time, end_time, repeat, notification) {
  return (dispatch) => {
    return axios
      .put(Url.Schedule + `/${id}`, {
        title,
        description,
        location,
        start_date,
        end_date,
        start_time,
        end_time,
        repeat,
        notification,
      })
      .then(() => {
        dispatch({
          type: UPDATE_SCHEDULE_BY_ID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function matchSchedule(date, start_time, end_time, friends) {
  return (dispatch) => {
    return axios
      .post(Url.Schedule + "/match", { date, start_time, end_time, friends })
      .then((response) => {
        dispatch({
          type: MATCH_SCHEDULE,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
