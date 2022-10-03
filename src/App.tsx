import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "./store/hooks";
import { FetchEmployeesData } from "./store/employee-actions";
import {replaceEmployee} from './store/employee-slice';
import {fetchAllEmployees} from './store/employee-slice';

function App() {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  // https://reactjs.org/warnings/invalid-hook-call-warning.html
  // dispatch(FetchEmployeesData());
  // useEffect(() => {
  //   dispatch(FetchEmployeesData());
  // }, [dispatch]);


  // dispatch(replaceEmployee(data));
  useEffect(() => {
    // fetch("http://localhost:3000/employee")
    //   .then((res) => res.json())
    //   .then((data) => {
        // dispatch(replaceEmployee(data));
      // });
      dispatch(fetchAllEmployees());
  }, [dispatch]);

  return (
    <div>
      <Homepage />
    </div>
  );
}

export default App;
