import { io } from "socket.io-client";

const url = import.meta.env ? "http://localhost:3000" : "/";

const socket = io(url, {
  autoConnect: false,
});

export default socket;
