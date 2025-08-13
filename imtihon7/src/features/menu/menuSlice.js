  import { createSlice } from "@reduxjs/toolkit";
  import products from "../../data";

  const menuSlice = createSlice({
    name: "menu",
    initialState: {
      products,
    },
    reducers: {},
  });

  export default menuSlice.reducer;
