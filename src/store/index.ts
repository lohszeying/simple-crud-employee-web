import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employee-slice";
import editSlice from "./edit-slice";
import pageSlice from "./page-slice";
import userSlice from "./user-slice";
import departmentSlice from "./department-slice";

const store = configureStore({
  reducer: { employee: employeeSlice, edit: editSlice.reducer, page: pageSlice.reducer, user: userSlice.reducer, department: departmentSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
