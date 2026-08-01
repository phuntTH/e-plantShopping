import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    // Add a plant to the cart
    addItem: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(
        (product) => product.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
        });
      }
    },

    // Remove an item completely from the cart
    removeItem: (state, action) => {
      const id = action.payload;

      state.items = state.items.filter(
        (item) => item.id !== id
      );
    },

    // Update the quantity of an item
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(
        (product) => product.id === id
      );

      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          state.items = state.items.filter(
            (product) => product.id !== id
          );
        }
      }
    },

  },

});

export const {
  addItem,
  removeItem,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
