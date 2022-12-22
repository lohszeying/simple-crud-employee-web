import { bindActionCreators, createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../model/status";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Department } from "../model/department";

export const createUser = createAsyncThunk(
  'user/add',
  // Declare the type your function argument here:
  async (payload: {username: string, password: string, department: string}, thunkApi) => {
    try {
      await axios.post(`http://localhost:3000/user`, {
        username: payload.username,
        password: payload.password,
        department: payload.department
      });
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  // Declare the type your function argument here:
  async (payload: {username: string, password: string}, thunkApi) => {
    try {
      const response = await axios.post(`http://localhost:3000/user/login`, {
        username: payload.username,
        password: payload.password,
      });

      const jwttoken = response.data.jwttoken;
      
      return jwttoken as string;
      
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const checkLogin = createAsyncThunk(
  'user/login',
  // Declare the type your function argument here:
  async (payload: string, thunkApi) => {
    try {
      const response = await axios.get(`http://localhost:3000/user/checklogin`, {
        headers: {
          jwttoken: "Bearer " + payload
        }
      });

      return response.data.authorized as boolean;
      
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

interface UserState {
  isLoggedIn: boolean,
  username: string,
  password: string,
  status: Status,
  errorMsg: string,
  token: string,
}
const initialState: UserState = {
  // false -> create mode
  // true -> edit mode
  isLoggedIn: false,
  username: '',
  password: '',
  status: Status.PENDING,
  errorMsg: '',
  token: ''
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    editIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(createUser.pending, (state, action) => {
      state.status = Status.PENDING;
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.status = Status.FULFILLED;
    })
    builder.addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.errorMsg = action.payload.response.data.errorMessage;
    })


    builder.addCase(loginUser.pending, (state, action) => {
      state.status = Status.PENDING;
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = Status.FULFILLED;
      // state.isLoggedIn = true;
    })
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.status = Status.REJECTED;
      state.errorMsg = action.payload.response.data.errorMessage;
    })
  }
});

export default userSlice;