import { LOGIN } from "./actionType";

/**
 * Set Logged in data
 * @param {object} Payload
 *
 */

export const setLoginData = (payload) => ({
  type: LOGIN,
  payload,
});
