import { createSlice } from "@reduxjs/toolkit";

interface PageState {
  page: number
}
const initialState: PageState = {
  page: 1
};

const pageSlice = createSlice({
  name: "page",
  initialState: initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    }
  },
});

export default pageSlice;