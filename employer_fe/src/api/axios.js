import Axios from "axios";
import { getAppStore } from "../store";

import history from "../history";

/**
 * Authorizes requests by injecting the token from the sessionStorage.
 * @param {import('axios').AxiosRequestConfig} request The request object
 */
const outgoingRequestInterceptor = (request) => {
  if (request.url) {
    const { loggedInUserData = {} } = getAppStore();
    const { token } = loggedInUserData;
    if (token) {
      request.headers["token"] = token;
    }
  }
  return request;
};

/**
 * This interceptor is used to handle all possible axios failure scenarios.
 * Add an early return to not pass the error ahead to the caller.
 * @param {Object} err The error object
 */
const responseErrorInterceptor = (err) => {
  let errorJSON = err.toJSON ? err.toJSON() : {};
  const { response: { status } = {} } = err;

  if (status === 401) {
    history.push("/login");
    return Promise.reject(err);
  }

  if (status < 500 && status >= 400) {
    // all 4xx errors
  }

  if (!!errorJSON && errorJSON.code === "ECONNABORTED") {
    console.log("request timeout");
  }
  if (!!errorJSON && errorJSON.message === "Network Error") {
    console.log("network error");
  }
  return Promise.reject(err);
};

let AxiosInstance = Axios.create({
  baseURL: "http://localhost:8080",
});

AxiosInstance.defaults.timeout = 30000;
AxiosInstance.defaults.headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

const responseSuccessInterceptor = (response) => {
  return response;
};

AxiosInstance.interceptors.request.use(
  (request) => outgoingRequestInterceptor(request),
  (error) => error
);

AxiosInstance.interceptors.response.use(
  (response) => responseSuccessInterceptor(response),
  (error) => responseErrorInterceptor(error)
);

export default AxiosInstance;
