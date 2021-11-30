import axios from "axios";
import { apiUrl } from "../../helpers/config";
import { Url } from "../../helpers/server";
import { GET_ALL_TASK, GET_TASK_BY_ID, GET_TASK_BY_DATE, CREATE_TASK, DELETE_TASK_BY_ID, UPDATE_TASK_BY_ID } from "./type";

export function getAllTask() {
  return (dispatch) => {
    return axios
      .get(apiUrl + `/user/tasks`)
      .then((response) => {
        dispatch({
          type: GET_ALL_TASK,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getTaskById(id) {
  return (dispatch) => {
    return axios
      .get(Url.Task + `/${id}`)
      .then((response) => {
        dispatch({
          type: GET_TASK_BY_ID,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getTaskByDate(date) {
  return (dispatch) => {
    return axios
      .post(Url.Dashboard + "/task", { date })
      .then((response) => {
        dispatch({
          type: GET_TASK_BY_DATE,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function createTask(title, description, date, time, todos, friends, priority) {
  return (dispatch) => {
    return axios
      .post(Url.Task, {
        title,
        description,
        date,
        time,
        todos,
        friends,
        priority,
      })
      .then(() => {
        dispatch({
          type: CREATE_TASK,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteTaskById(id) {
  return (dispatch) => {
    return axios
      .delete(Url.Task + `/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_TASK_BY_ID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateTaskById(id, title, description, date, time, friends, priority) {
  return (dispatch) => {
    return axios
      .put(Url.Task + `/${id}`, {
        title,
        description,
        date,
        time,
        friends,
        priority,
      })
      .then(() => {
        dispatch({
          type: UPDATE_TASK_BY_ID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
