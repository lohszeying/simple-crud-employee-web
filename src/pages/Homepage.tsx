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


const Homepage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [cookies, setCookie, removeCookie] = useCookies(['jwttoken']);
  const dispatch = useAppDispatch();

  // If cookie exist, check expiration time

  useEffect(() => {
    if (cookies.jwttoken) {
      // check expiration time (send some kind of request?)
      dispatch(checkLogin(cookies.jwttoken as string)).then((result) => {
        console.log("change in cookies in homepage, result of isLoggedIn:", result)
        dispatch(userSlice.actions.editIsLoggedIn(result.payload));
      });
    }
  }, [cookies.jwttoken]);
  

  return (<React.Fragment>
    {/* <Employees /> */}
    {isLoggedIn ? <Employees /> : <Login />}
  </React.Fragment>)
};

export default Homepage;