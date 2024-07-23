const express = require("express");
const app = express();
const path = require("path");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`App running at ${PORT}`));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Initialize socket.io with the server instance
const io = socketIo(server);

io.on("connection", onConnected);
let socketsConnected = new Set();

function onConnected(socket) {
  console.log(`New connection: ${socket.id}`);
  socketsConnected.add(socket.id);

  io.emit("total-people", socketsConnected.size);

  socket.on("disconnect", () => {
    console.log("socket disconnectd", socket.id);
    socketsConnected.delete(socket.id);
    io.emit("total-people", socketsConnected.size);
  });

  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("chat-message", data);
  });
}
