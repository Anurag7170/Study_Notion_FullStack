import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initalState,
  reducers: {
    setTotalItems(state, value) {
    //   state.signupData = value.payload;
    },
    // addcart
    // remove cart
    // resetcart

  },
});

export const { setTotalItems } = cartSlice.actions;

export default cartSlice.reducer;