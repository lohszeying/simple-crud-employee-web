import React from "react";
// import EmployeeForm from "../components/EmployeeForm";
// import Employees from "../components/Employees";
// import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import userSlice from "../store/user-slice";
import { checkLogin } from "../store/user-slice";
import { useCookies } from "react-cookie";


const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn])

  return (<React.Fragment>
    {isLoggedIn ? "Already logged in" : <LoginForm />}
    
  </React.Fragment>)
};

export default Login;