import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface EmployeeState {
  employees: Array<any>
}

const initialState = {
  employees: new Array<any>()
} as EmployeeState

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    replaceEmployee: (state, action: PayloadAction<Array<any>>) => {
      state.employees = action.payload;
    }
  }
});

export const {replaceEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;