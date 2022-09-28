import { replaceEmployee } from "./employee-slice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "./hooks";

export const FetchEmployeesData = () => {
  // const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch();
  return async () => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/employee", {
        mode: 'no-cors'
      });

      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }

      const data = await response.json();

      return data;
    }

    try {
      // Fetch data from backend API
      const employeeData = await fetchData();
      dispatch(
        replaceEmployee([])
      );
    } catch (error) {
      console.log("error msg:", error);
    }
  }
}