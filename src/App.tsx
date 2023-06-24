import { useEffect } from "react";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authentication/authenticationSlice";
import { useSelector } from "react-redux";
import { logOutUser } from "./redux/features/authentication/authenticationSlice";
// import { signOut } from "firebase/auth";
// import { auth } from "./firebase/firebaseConfig";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.authLoading);

  console.log(user);

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(logOutUser());
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log("here");
      dispatch(setUser(JSON.stringify(user)));
    });
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          !authLoading &&
          (!user ? (
            <Navigate to="/login-register" replace />
          ) : (
            <h1>Home page</h1>
          ))
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
      <Route path="/login-register" element={<LoginRegister />}></Route>
    </Routes>
  );
}
