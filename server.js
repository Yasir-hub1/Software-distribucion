const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('position', (data) => {
        console.log('Driver position received:', data);
        io.emit('driverPosition', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 3003;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
