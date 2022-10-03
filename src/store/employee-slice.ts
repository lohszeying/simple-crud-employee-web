import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";
import { Employee } from "../model/employee";
import store from "./employee-slice";

// https://redux.js.org/usage/usage-with-typescript
// fetchUserById
// extraReducers

// https://redux-toolkit.js.org/usage/usage-guide#asynchronous-logic-and-data-fetching

export const fetchAllEmployees = createAsyncThunk(
  'employees/fetch',
  // Declare the type your function argument here:
  async () => {
    const response = await fetch(`http://localhost:3000/employee`);
    // Inferred return type: Promise<MyData>
    return (await response.json()) as Employee;
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: { 
    employees: [] as Employee[],
    status: '' as String },
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    replaceEmployee: (state, action: PayloadAction<Employee[]>) => {
      let str = JSON.stringify(action.payload);
      console.log(str);
      state.employees = action.payload;
    },
  },
  extraReducers: builder => {
    // pending
    // rejected
    builder.addCase(fetchAllEmployees.pending, (state, action) => {
      state.status = 'pending';
    })
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.employees.push(action.payload);
    })
    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      state.status = 'rejected';
    })
  }
});



export const { addEmployee, replaceEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;

