import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employee-slice";
import editSlice from "./edit-slice";

const store = configureStore({
  reducer: { employee: employeeSlice, edit: editSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
