import { bindActionCreators, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Employee } from "../model/employee";

// https://redux.js.org/usage/usage-with-typescript
// fetchUserById
// extraReducers

// https://redux-toolkit.js.org/usage/usage-guide#asynchronous-logic-and-data-fetching

export const fetchAllEmployees = createAsyncThunk(
  'employees/fetch',
  // Declare the type your function argument here:
  async (payload, thunkApi) => {
    const response = await axios.get(`http://localhost:3000/employee`);

    return response.data.employees as Employee[];
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  // Declare the type your function argument here:
  async (payload: number, thunkApi) => {
    try {
      const response = await axios.delete(`http://localhost:3000/employee/${payload}`);

      return payload as number;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

interface EmployeeState {
  employees: Employee[]
  status: string
}
const initialState: EmployeeState = {
  employees: [],
  status: ''
};

const employeeSlice = createSlice({
  name: "employee",
  initialState:initialState,
  reducers: {},
  extraReducers: builder => {
    // pending
    // rejected
    builder.addCase(fetchAllEmployees.pending, (state, action) => {
      state.status = 'pending';
    })
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
    })
    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      state.status = 'rejected';
    })
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      const index = state.employees.findIndex(
        ({id}) => id === action.payload
      );
      state.employees.splice(index, 1);
    })
  }
});

// console.log("employeeSlice:", employeeSlice);

export default employeeSlice.reducer;