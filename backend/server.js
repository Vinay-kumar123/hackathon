const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 5501;

app.use(express.static(path.join(__dirname, '../frontend')));

let textData = "";

// Socket.io connection for real-time communication
io.on('connection', (socket) => {
  console.log('New user connected');

  // Send existing text to new clients
  socket.emit('loadText', textData);

  // Listen for text changes and broadcast them to all clients
  socket.on('textChanged', (newText) => {
    textData = newText;
    socket.broadcast.emit('textChanged', newText);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
