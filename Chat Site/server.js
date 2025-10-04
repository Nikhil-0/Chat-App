import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users = {};

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('user login', (username) => {
    users[socket.id] = username;
    io.emit('update user list', Object.values(users));
    socket.broadcast.emit('system message', `${username} has joined the chat.`);
  });

  socket.on('chat message', (payload) => {
    io.emit('chat message', { ...payload, senderId: socket.id });
  });

  socket.on('typing', (username) => {
    socket.broadcast.emit('typing status', `${username} is typing...`);
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('typing status', '');
  });

  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      console.log('user disconnected:', username);
      delete users[socket.id];
      io.emit('update user list', Object.values(users));
      io.emit('system message', `${username} has left the chat.`);
    }
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});