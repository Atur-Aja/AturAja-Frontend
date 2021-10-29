import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import schedule from "./schedule";
import task from "./task";

export default combineReducers({
  auth: auth,
  message: message,
  schedule: schedule,
  task: task,
});
