const express = require("express");
const socketIO = require("socket.io");

const PORT = process.env.PORT || 1337;

const server = express();
server.all("/formfield", (req, res) =>
  res.sendFile("/form.html", { root: __dirname })
);
server.all("/overlay", (req, res) =>
  res.sendFile("/overlay.html", { root: __dirname })
);

const http = server.listen(PORT, () =>
  console.log(`*exp: listening on ${PORT}`)
);

const io = socketIO(http);

io.on("connection", (socket) => {
  socket.on("stream message", (text) => {
    socket.broadcast.emit("stream message", text);
  });
});
