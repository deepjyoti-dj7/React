import { configureStore } from "@reduxjs/toolkit";
import counter from "./slices/counter";
import cart from "./slices/cart";
import theme from "./slices/theme";

export const store = configureStore({
  reducer: {
    counter,
    cart,
    theme,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
