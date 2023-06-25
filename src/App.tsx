import { useEffect } from "react";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { setUser } from "./redux/features/authentication/authenticationSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { signOutUser } from "./redux/features/authentication/authenticationSlice";
// import { signOut } from "firebase/auth";
// import { auth } from "./firebase/firebaseConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  const authLoading = useAppSelector((state) => state.auth.authLoading);
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(signOutUser());
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log("here");
      dispatch(setUser(JSON.stringify(user)));
    });
  }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            !authLoading ? (
              !user ? (
                <Navigate to="/login-register" replace />
              ) : (
                <h1>Home page</h1>
              )
            ) : (
              ""
            )
          }
        ></Route>
        <Route
          path="/logout"
          element={
            <div>
              <button onClick={handleLogout}>logout</button>
            </div>
          }
        ></Route>
        <Route
          path="/login-register"
          element={
            !authLoading ? user ? <Navigate to="/" /> : <LoginRegister /> : ""
          }
        ></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}
