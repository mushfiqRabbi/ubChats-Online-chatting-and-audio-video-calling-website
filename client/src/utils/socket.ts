import { Socket, io } from "socket.io-client";

function getSocket(email: string) {
  return io(`http://localhost:3000`, {
    auth: {
      email: email,
    },
  });
}

export default getSocket;
