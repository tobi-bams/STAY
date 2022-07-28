import axios from "axios";

const api = axios.create({
  baseURL: "https://api.fluidcoins.com/v1/",
});

export default api;

api.interceptors.request.use(
  function (config) {
    config.headers = {
      ...config.headers,
    };
    const token = process.env.FLUIDCOINS_SECRET;
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    return Promise.reject(error);
  }
);
