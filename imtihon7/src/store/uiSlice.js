import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isOrderModalOpen: false,
  },
  reducers: {
    openOrderModal: (state) => {
      state.isOrderModalOpen = true;
    },
    closeOrderModal: (state) => {
      state.isOrderModalOpen = false;
    },
  },
});

export const { openOrderModal, closeOrderModal } = uiSlice.actions;
export default uiSlice.reducer;
