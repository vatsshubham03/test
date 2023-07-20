import React from "react";

import { useStore } from "../../store";

const Dashboard = () => {
  const {
    dispatch,
    state: { loggedInUser = {} },
  } = useStore();

  console.log("value of logged in user", loggedInUser);
  return <div>Dashboard page</div>;
};

export default Dashboard;
