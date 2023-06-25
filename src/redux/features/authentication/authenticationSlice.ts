import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface SignInData {
  email: string;
  password: string;
}
interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export const signInUser = createAsyncThunk(
  "authentication/signInUser",
  async (user: SignInData) => {
    try {
      return JSON.stringify(
        await signInWithEmailAndPassword(auth, user.email, user.password)
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);
export const signUpUser = createAsyncThunk(
  "authentication/signUpUser",
  async (user: SignUpData) => {
    try {
      return JSON.stringify(
        await createUserWithEmailAndPassword(auth, user.email, user.password)
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
);

export const signOutUser = createAsyncThunk(
  "authentication/singOutUser",
  async () => {
    try {
      return JSON.stringify(await signOut(auth));
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.authLoading = true;
        toast.info("SIGNING IN!");
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.authLoading = false;
        // console.log(action);
        toast.success("LOGIN SUCCESSFUL!");
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.authLoading = false;
        toast.error(
          action.error.message
            ?.slice(action.error.message?.indexOf("/") + 1, -2)
            .replace(/-/gi, " ")
            .toUpperCase() + "!"
        );
        // console.log(
        //   action.error.message
        //     ?.slice(action.error.message?.indexOf("/") + 1, -2)
        //     .replace(/-/gi, " ")
        //     .toUpperCase()
        // );
      })
      .addCase(signUpUser.pending, (state) => {
        state.authLoading = true;
        toast.info("SIGNING UP...");
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.authLoading = false;
        // console.log(action);
        toast.success("SIGNUP SUCCESSFUL!");
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.authLoading = false;
        toast.error(
          action.error.message
            ?.slice(action.error.message?.indexOf("/") + 1, -2)
            .replace(/-/gi, " ")
            .toUpperCase() + "!"
        );
        // console.log(
        //   action.error.message
        //     ?.slice(action.error.message?.indexOf("/") + 1, -2)
        //     .replace(/-/gi, " ")
        //     .toUpperCase()
        // );
      })
      .addCase(signOutUser.pending, (state) => {
        state.authLoading = true;
        toast.info("SINGING OUT!");
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.authLoading = false;
        // console.log(action);
        toast.success("SIGNING OUT SUCCESSFUL!");
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.authLoading = false;
        console.log(action);
        toast.error(
          action.error.message
            ?.slice(action.error.message?.indexOf("/") + 1, -2)
            .replace(/-/gi, " ")
            .toUpperCase() + "!"
        );
      });
  },
});

export const { setUser } = authenticationSlice.actions;

export default authenticationSlice.reducer;
