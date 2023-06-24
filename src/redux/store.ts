import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./features/authentication/authenticationSlice";

const store = configureStore({
  reducer: {
    auth: authenticationReducer,
  },
});

export default store;
