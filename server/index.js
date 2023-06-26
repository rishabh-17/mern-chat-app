const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./router/userRoutes')
const messageRouter = require('./router/messageRoutes')
const socket = require('socket.io')
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRouter);


// database Connection
mongoose.connect('mongodb://127.0.0.1:27017/chat');


// server start
const server = app.listen(5000,() => {
    console.log("listening on port localhost//:5000");
})

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });