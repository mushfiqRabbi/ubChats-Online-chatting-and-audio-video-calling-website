// import { useEffect } from "react";
import LoginRegister from "./components/login_register_page/LoginRegister";
import { Route, Routes } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
import auth from "./firebase/firebaseConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home_page/Home";
// import { useAuthSignOut } from "@react-query-firebase/auth";
import { useAuthUser } from "@react-query-firebase/auth";

export default function App(): JSX.Element {
  const { data: user, isLoading } = useAuthUser(["user"], auth);
  // const signOutMutation = useAuthSignOut(auth);
  // const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   signOutMutation.mutate();
  // };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     console.log("user : ", user);
  //   });
  // }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={!isLoading && (user ? <Home /> : <LoginRegister />)}
        ></Route>
        {/* <Route path="/login-register" element={<LoginRegister />}></Route> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}
