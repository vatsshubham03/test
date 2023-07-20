import Axios from "./axios";

/**
 * Application Preview
 * @param {Object} payload
 */
export const callLoginApi = (payload) => {
  return Axios.post("/auth/login", payload);
};
