import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

import { useAppDispatch } from "../../store/hooks";
import editSlice from '../../store/edit-slice';

import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import pageSlice from "../../store/page-slice";

const Header = (props: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

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

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/" activeClassName={classes.active} onClick={homepageHandler}>
          Employees
        </NavLink>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/create" activeClassName={classes.active} onClick={createEmployeePageHandler}>
              Add Employee
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
