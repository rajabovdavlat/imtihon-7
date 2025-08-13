import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      state[id] = (state[id] || 0) + 1;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      if (state[id] > 1) {
        state[id] -= 1;
      } else {
        delete state[id];
      }
    },
    deleteFromCart: (state, action) => {
      const id = action.payload;
      delete state[id];
    },
    clearCart: () => {
      return {};
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
