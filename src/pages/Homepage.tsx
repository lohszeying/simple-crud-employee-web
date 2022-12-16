import React from "react";
import Employees from "../components/Employees";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Login from './Login';

const Homepage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (<React.Fragment>
    {isLoggedIn ? <Employees /> : <Login />}
    {/* <Employees /> */}
  </React.Fragment>)
};

export default Homepage;