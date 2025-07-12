import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  cartData: []
};

export const counterCartSlice = createSlice({
  name: "counterCart",
  initialState,
  reducers: {
    addCart: (state) => {
      let carts = JSON.parse(localStorage.getItem("Cart"));
      state.cartData = carts
      state.value = carts.length;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCart } = counterCartSlice.actions;

export default counterCartSlice.reducer;
