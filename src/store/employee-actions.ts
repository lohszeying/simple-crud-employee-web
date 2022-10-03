import { addEmployee } from "./employee-slice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import axios from 'axios';
import { useAppSelector, useAppDispatch } from "./hooks";

export const FetchEmployeesData = () => {
  const dispatch = useAppDispatch();
  return async () => {
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
