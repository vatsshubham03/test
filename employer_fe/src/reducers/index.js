import { LOGIN } from "../actions/actionType";

import { setAppStore } from "../store";

export const initialState = {
  loggedInUser: { name: "shubham" },
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  let updatedState;
  switch (type) {
    case LOGIN:
      updatedState = { ...state, loggedInUser: payload };
      break;
    default:
      updatedState = state;
      break;
  }
  setAppStore(updatedState);
  return updatedState;
}
