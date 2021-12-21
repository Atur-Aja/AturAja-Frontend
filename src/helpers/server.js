import { authUrl, apiUrl } from "./config";

export const Url = {
  Login: authUrl + "/login",
  Register: authUrl + "/register",
  Logout: authUrl + "/logout",
  Schedule: apiUrl + "/schedules",
  Task: apiUrl + "/tasks",
  Todo: apiUrl + "/todos",
  Dashboard: apiUrl + "/dashboard",
  User: apiUrl + "/user",
  Friend: apiUrl + "/friend",
  Password: apiUrl + "/password",
};
