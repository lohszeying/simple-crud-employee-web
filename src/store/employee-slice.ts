import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

interface Employee {
  id: number,
  name: string,
  salary: number,
  department: string
}
interface EmployeeState {
  employees: Employee[]
}

const initialState = {
  employees: new Array<any>()
} as EmployeeState

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    }
  }
});

export const {addEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;