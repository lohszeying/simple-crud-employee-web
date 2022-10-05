import { createSlice } from "@reduxjs/toolkit";

interface EditState {
  edit: boolean,
  idToEdit: number
}
const initialState: EditState = {
  // false -> create mode
  // true -> edit mode
  edit: false,
  idToEdit: 0
};

const editSlice = createSlice({
  name: "edit",
  initialState: initialState,
  reducers: {
    editState(state, action) {
      state.edit = action.payload;
    },
    setIdToEdit(state, action) {
      state.idToEdit = action.payload;
    }
  },
});

export default editSlice;