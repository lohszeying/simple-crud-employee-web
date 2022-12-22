import React from "react";
import Employees from "../components/Employees";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import Login from './Login';
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import userSlice from "../store/user-slice";
import { checkLogin } from "../store/user-slice";
import {toast} from 'react-toastify'
import { Status } from "../model/status";
import { useHistory } from "react-router-dom";

const Homepage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  // const getStatus = useSelector((state: RootState) => state.user.status);
  // const getErrorMsg = useSelector((state: RootState) => state.user.errorMsg);
  // const history = useHistory();

  // useEffect(() => {
  //   if (getStatus === Status.REJECTED) {
  //     toast("Rejected: " + getErrorMsg);
  //   } else if (getStatus === Status.FULFILLED) {
  //     toast("Success!")
  //   }
  // }, [getStatus])

  return (<React.Fragment>
    {isLoggedIn ? <Employees /> : <Login />}
  </React.Fragment>)
};

export default Homepage;