import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authentication/authenticationSlice";

const store = configureStore({
  reducer: {
    auth: authenticationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
