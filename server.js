const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
var cors = require('cors');

const users = {};

app.use(cors())

// app.use(cors({origin: ['https://localhost:3000', 'https://127.0.0.1:3000']}));

io.on("connection", (socket) => {
  console.log(socket.id, "connected");
  if (!users[socket.id]) {
    users[socket.id] = socket.id;
  }
  socket.emit("yourID", socket.id);
  io.sockets.emit("allUsers", users);
  socket.on("disconnect", () => {
    delete users[socket.id];
    console.log(socket.id, "disconnected");
  });

  socket.on("callUser", (data) => {
    socket.to(data.userToCall).emit("hey", {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("acceptCall", (data) => {
    socket.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("candidate", (data) => {
    socket.to(data.to).emit("candidate", data.candidate);
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));
