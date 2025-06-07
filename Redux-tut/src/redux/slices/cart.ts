import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  name: string;
  price: number;
}

const initialState: Product[] = [];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((product) => product.id !== action.payload);
    },
    clearCart: () => [],
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
