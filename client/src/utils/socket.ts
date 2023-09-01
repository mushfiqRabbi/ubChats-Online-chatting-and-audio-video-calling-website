import { io } from "socket.io-client";

export const initiatePrimarySocket = (email: string) => {
  return io("http://localhost:3000", {
    auth: {
      email: email,
    },
  });
};
