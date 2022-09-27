import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employee-slice";

const store = configureStore({
  reducer: { employee: employeeSlice.reducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
