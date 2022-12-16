import { bindActionCreators, createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../model/status";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Department } from "../model/department";

export const getDepartments = createAsyncThunk(
  'department/get',
  // Declare the type your function argument here:
  async (payload, thunkApi) => {
    try {
      const response = await axios.get(`http://localhost:3000/department`);

      const getDepartmentNames = response.data.departments.map((result: any) => result.department_name);

      return getDepartmentNames as string[];
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

interface DepartmentState {
  department: string[],
  status: Status,
  errorMsg: string,
}
const initialState: DepartmentState = {
  department: [],
  status: Status.PENDING,
  errorMsg: ''
};

const departmentSlice = createSlice({
  name: "department",
  initialState: initialState,
  reducers: {
    // editIsLoggedIn(state, action) {
    //   state.isLoggedIn = action.payload;
    // }
  },
  extraReducers: builder => {
    builder.addCase(getDepartments.pending, (state, action) => {
      state.status = Status.PENDING;
    })
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.status = Status.FULFILLED;
      state.department = action.payload;
    })
    builder.addCase(getDepartments.rejected, (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.errorMsg = action.payload.response.data.errorMessage;
    })
  }
});

export default departmentSlice;