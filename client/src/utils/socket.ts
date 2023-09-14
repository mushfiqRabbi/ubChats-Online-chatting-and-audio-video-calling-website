import { io } from "socket.io-client";

// const url = import.meta.env ? "http://localhost:3000" : "/";

const socket = io(
  `${
    import.meta.env.PROD
      ? "https://ub-chats.onrender.com/"
      : "http://127.0.0.1:3000"
  }`,
  {
    autoConnect: false,
  }
);

export default socket;
