import axios from "axios";
import { logout } from "../redux/actions/auth";

const SetupServices = (store) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers["content-Type"] = "application/json";

      const token = localStorage.getItem("user-token");
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === UNAUTHORIZED && window.location.href != "http://localhost:3000/") {
        dispatch(logout());
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
};

export default SetupServices;
