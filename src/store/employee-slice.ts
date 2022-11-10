import { bindActionCreators, createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { rejects } from "assert";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Department } from "../model/department";
import { Employee } from "../model/employee";
import { Status } from "../model/status";

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

export const fetchEmployeeById = createAsyncThunk(
  'employees/fetchById',
  // Declare the type your function argument here:
  async (payload: number, thunkApi) => {

    const response = await axios.get(`http://localhost:3000/employee/${payload}`);

    return response.data as Employee;
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  // Declare the type your function argument here:
  async (payload: number, thunkApi) => {
    try {
      await axios.delete(`http://localhost:3000/employee/${payload}`);

      return payload as number;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const addEmployee = createAsyncThunk(
  'employees/add',
  // Declare the type your function argument here:
  async (payload: {name: string, salary: number, department: string}, thunkApi) => {
    try {
      await axios.post(`http://localhost:3000/employee`, {
        name: payload.name,
        salary: payload.salary,
        department: payload.department
      });
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/update',
  // Declare the type your function argument here:
  async (payload: {id: number, name: string, salary: number, department: string}, thunkApi) => {
    try {
      await axios.put(`http://localhost:3000/employee/${payload.id}`, {
        name: payload.name,
        salary: payload.salary,
        department: payload.department
      });
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

interface EmployeeState {
  employees: Employee[]
  status: Status,
  errorMsg: String,
  currentEmployee: Employee
}
const initialState: EmployeeState = {
  employees: [],
  status: Status.PENDING,
  errorMsg: '',
  currentEmployee: {id: 0, name: '', salary: 0, department: Department.HR}
};

const employeeSlice = createSlice({
  name: "employee",
  initialState:initialState,
  reducers: {},
  extraReducers: builder => {
    // pending
    // rejected
    builder.addCase(fetchAllEmployees.pending, (state, action) => {
      state.status = Status.PENDING;
    })
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      // state.status = Status.FULFILLED;
      state.employees = action.payload;
    })
    builder.addCase(fetchAllEmployees.rejected, (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.errorMsg = action.payload.response.data.errorMessage;
    })


    builder.addCase(deleteEmployee.pending, (state, action) => {
      state.status = Status.PENDING;
    })
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.status = Status.FULFILLED;
      const index = state.employees.findIndex(
        ({id}) => id === action.payload
      );
      state.employees.splice(index, 1);
    })
    builder.addCase(deleteEmployee.rejected, (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.errorMsg = action.payload.response.data.errorMessage;
    })


    builder.addCase(addEmployee.pending, (state, action) => {
      state.status = Status.PENDING;
    })
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.status = Status.FULFILLED;
    })
    builder.addCase(addEmployee.rejected, (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.errorMsg = action.payload.response.data.errorMessage;
    })


    builder.addCase(fetchEmployeeById.pending, (state, action) => {
      state.status = Status.PENDING;
    })
    builder.addCase(fetchEmployeeById.fulfilled, (state, action) => {
      // state.status = Status.FULFILLED;
      state.currentEmployee = action.payload;
    })
    builder.addCase(fetchEmployeeById.rejected, (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.errorMsg = action.payload.response.data.errorMessage;
    })


    builder.addCase(updateEmployee.pending, (state, action) => {
      state.status = Status.PENDING;
    })
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.status = Status.FULFILLED;
    })
    builder.addCase(updateEmployee.rejected, (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.errorMsg = action.payload.response.statusText;
    })
  }
});

export default employeeSlice.reducer;