import React, { useContext } from "react";
import rootReducer, { initialState } from "../reducers";

/**
 This store can use globally out of componet
 */
export const getAppStore = () => {
  return JSON.parse(sessionStorage.getItem("employeeStore")) || {};
};

/**
 Set store globally
 */
export const setAppStore = (store) => {
  sessionStorage.setItem("employeeStore", JSON.stringify(store));
};

/**
 * This is the actual context. Needs to be injected into `useContext` to
 * get store functionalities
 */
export const Store = React.createContext();

/**
 * Simple hook to get store.
 */
export const useStore = () => useContext(Store);

export const storeDispatcher = {
  isReady: false,
  dispatch: () => {
    throw new Error("Dispatch Unavailable");
  },
};

export const StoreProvider = ({ children }) => {
  const persistedState = getAppStore();
  const [state, dispatch] = React.useReducer(
    rootReducer,
    persistedState || initialState
  );
  const storeValue = { state, dispatch };
  if (!storeDispatcher.isReady) {
    storeDispatcher.isReady = true;
    storeDispatcher.dispatch = (params) => dispatch(params);
    Object.freeze(storeDispatcher);
  }
  return <Store.Provider value={storeValue}>{children}</Store.Provider>;
};
