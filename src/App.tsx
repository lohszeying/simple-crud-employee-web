import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "./store/hooks";
import { FetchEmployeesData } from "./store/employee-actions";

function App() {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  // https://reactjs.org/warnings/invalid-hook-call-warning.html
  dispatch(FetchEmployeesData());
  // useEffect(() => {
  //   dispatch(FetchEmployeesData());
  // }, [dispatch]);
  // useEffect(() => {
  //   const response = fetch("http://localhost:3000/employee")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, [dispatch]);

  return (
    <div>
      <Homepage />
    </div>
  );
}

export default App;
