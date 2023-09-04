async function getSocketByEmail(email, ioServer) {
  const allSockets = await ioServer.fetchSockets();
  const socket = allSockets.find(
    (socket) => socket.handshake.auth.email === email
  );
  return socket;
}

module.exports = { getSocketByEmail };
