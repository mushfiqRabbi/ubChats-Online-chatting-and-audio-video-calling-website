import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  console.log(socket.connected); // true
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
