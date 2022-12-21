import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

import { useAppDispatch } from "../../store/hooks";
import editSlice from '../../store/edit-slice';

import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import pageSlice from "../../store/page-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import userSlice from "../../store/user-slice";
import { useCookies } from "react-cookie";

const Header = (props: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const [cookies, setCookie, removeCookie] = useCookies(['jwttoken']);

  const homepageHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch(pageSlice.actions.setPage(1));

    history.push('/');
  }

  const createEmployeePageHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch(editSlice.actions.editState(false));

    history.push('/create');
  }

  const logoutUser = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch(userSlice.actions.editIsLoggedIn(false));

    // Remove cookie
    removeCookie('jwttoken');

    history.push('/');
  }

  const checkIfLoggedIn = () => {
    if (isLoggedIn) {
      return (
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/create" activeClassName={classes.active} onClick={createEmployeePageHandler}>
              Add Employee
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" activeClassName={classes.active} onClick={logoutUser} >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
      );
    } else {
      return (
        <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/register" activeClassName={classes.active}>
              Register
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" activeClassName={classes.active}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      );
    }
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/" activeClassName={classes.active} onClick={homepageHandler}>
          Employees
        </NavLink>
      </div>
      {/* {isLoggedIn ? <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/create" activeClassName={classes.active} onClick={createEmployeePageHandler}>
              Add Employee
            </NavLink>
          </li>
        </ul>
      </nav> : null} */}

      {checkIfLoggedIn()}
      
    </header>
  );
};

export default Header;
