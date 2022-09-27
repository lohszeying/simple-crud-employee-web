import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface EmployeeState {
  employees: Array<any>
}

const initialState: EmployeeState = {
  employees: new Array<any>()
}

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    replaceEmployee: (state, action: PayloadAction<Array<any>>) => {
      state.employees = action.payload;
    }
  }
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice;