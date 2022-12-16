import { bindActionCreators, createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from "@reduxjs/toolkit";
// import { Status } from "../model/status";
// import axios, { AxiosError, AxiosResponse } from "axios";
// // import { Department } from "../model/department";

// export const getDepartments = createAsyncThunk(
//   'department/get',
//   // Declare the type your function argument here:
//   async (payload, thunkApi) => {
//     try {
//       // await axios.post(`http://localhost:3000/department`, {
//       //   username: payload.username,
//       //   password: payload.password,
//       //   department: payload.department
//       // });

//       const response = await axios.get(`http://localhost:3000/department`);

//       return response.data.department as Department[];
//     } catch (e) {
//       return thunkApi.rejectWithValue(e);
//     }
//   }
// );

// interface DepartmentState {
//   department: Department,
//   status: Status,
//   errorMsg: string,
// }
// const initialState: DepartmentState = {
//   department: Department.HR,
//   status: Status.PENDING,
//   errorMsg: ''
// };

// const departmentSlice = createSlice({
//   name: "department",
//   initialState: initialState,
//   reducers: {
//     // editIsLoggedIn(state, action) {
//     //   state.isLoggedIn = action.payload;
//     // }
//   },
//   extraReducers: builder => {
//     builder.addCase(createUser.pending, (state, action) => {
//       state.status = Status.PENDING;
//     })
//     builder.addCase(createUser.fulfilled, (state, action) => {
//       state.status = Status.FULFILLED;
//       state.isLoggedIn = true;
//     })
//     builder.addCase(createUser.rejected, (state, action: PayloadAction<any>) => {
//       state.status = Status.REJECTED;
//       state.errorMsg = action.payload.response.data.errorMessage;
//     })
//   }
// });

// export default userSlice;