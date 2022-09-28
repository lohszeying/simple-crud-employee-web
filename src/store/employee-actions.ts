import { addEmployee } from "./employee-slice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axios from 'axios';
import { useAppSelector, useAppDispatch } from "./hooks";

export const FetchEmployeesData = () => {
  // const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch();
  return async (dispatch: Dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/employee");

      if (!response.ok) {
        throw new Error(
          "Could not fetch cart data."
        );
      }

      const data = await response.json();

      console.log(data);

      return data;
    };

    try {
      // Fetch data from backend API
      const employeeData = await fetchData();
    } catch (error) {
      console.log("error msg:", error);
    }
  };
};
