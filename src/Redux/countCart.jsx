import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  cartData: [],
  open: false
};

export const counterCartSlice = createSlice({
  name: "counterCart",
  initialState,
  reducers: {
    addCart: (state) => {
      let carts = JSON.parse(localStorage.getItem("Cart"));
      state.cartData = carts
      state.value = carts?.length;
    },
    openModal: (state, action) => {
      state.open = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { addCart, openModal } = counterCartSlice.actions;

export default counterCartSlice.reducer;
