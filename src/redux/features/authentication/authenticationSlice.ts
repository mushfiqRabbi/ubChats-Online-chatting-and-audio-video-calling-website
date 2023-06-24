import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    user: null,
    authLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = JSON.parse(action.payload);
      state.authLoading = false;
    },
    signUp: (state, action) => {
      // console.log(action.payload);
      state.authLoading = true;
      try {
        createUserWithEmailAndPassword(
          auth,
          action.payload.email,
          action.payload.password
        );
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    signIn: (state, action) => {
      state.authLoading = true;
      try {
        signInWithEmailAndPassword(
          auth,
          action.payload.email,
          action.payload.password
        );
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
    logOutUser: (state) => {
      state.authLoading = true;
      try {
        signOut(auth);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    },
  },
});

export const { signUp, setUser, signIn, logOutUser } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
