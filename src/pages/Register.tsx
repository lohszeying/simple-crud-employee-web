import React from "react";
// import EmployeeForm from "../components/EmployeeForm";
// import Employees from "../components/Employees";
import RegisterForm from "../components/RegisterForm";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import userSlice from "../store/user-slice";
import { checkLogin } from "../store/user-slice";
import { useCookies } from "react-cookie";
import classes from "./Login.module.css";

const Register = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [cookies, setCookie, removeCookie] = useCookies(['jwttoken']);

  useEffect(() => {
    if (cookies.jwttoken) {
      dispatch(checkLogin(cookies.jwttoken as string)).then((result) => {
        dispatch(userSlice.actions.editIsLoggedIn(result.payload));
      });
    }
  }, [cookies.jwttoken]);

  return (<React.Fragment>
    {isLoggedIn? <h2 className={classes["logged-in-msg"]}>Already logged in</h2> : <RegisterForm />}
    {/* <RegisterForm /> */}
  </React.Fragment>)
};

export default Register;