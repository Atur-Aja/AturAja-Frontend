import axios from "axios";
import { Url } from "../helpers/server";
import { CREATE_TODO, UPDATE_TODO_BY_ID, DELETE_TODO_BY_ID } from "./type";

export function createTodo(task_id, todos) {
  return (dispatch) => {
    return axios
      .post(Url.Todo, {
        task_id,
        todos,
      })
      .then(() => {
        dispatch({
          type: CREATE_TODO,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteTodoById(id) {
  return (dispatch) => {
    return axios
      .delete(Url.Todo + `/${id}`)
      .then(() => {
        dispatch({
          type: DELETE_TODO_BY_ID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateTodoById(id, name) {
  return (dispatch) => {
    return axios
      .put(Url.Todo + `/${id}`, {
        name,
      })
      .then(() => {
        dispatch({
          type: UPDATE_TODO_BY_ID,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
