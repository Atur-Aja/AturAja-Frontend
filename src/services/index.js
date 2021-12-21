import axios from "axios";

const setupServices = () => {
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

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setupServices;
