import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888",
  timeout: 1000,
});
const jwtToken = localStorage.getItem("jwt");

if (jwtToken) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
}
// Handle the case where there is no valid token, e.g., redirect to login page or show an error message.

instance.defaults.withCredentials = true;
//
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = error && error.response ? error.response.status : 500;
    console.log("check status", status);
    // Do something with response error
    switch (status) {
      // authentication (token related issues)
      case 401: {
        alert("401 Unauthorized User");
        // window.location.href = "/login";
        return error.response.data;
      }

      // forbidden (permission related issues)
      case 403: {
        alert("you dont have permission to acces this isue");
        return Promise.reject(error);
      }

      // bad request
      case 400: {
        return Promise.reject(error);
      }

      // not found
      case 404: {
        return Promise.reject(error);
      }

      // conflict
      case 409: {
        return Promise.reject(error);
      }

      // unprocessable
      case 422: {
        return Promise.reject(error);
      }

      // generic api error (server related) unexpected
      default: {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
