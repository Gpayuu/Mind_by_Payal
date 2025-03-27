const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('./config/db');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api', chatRoutes);

// Store connected users
let users = {};

// WebSocket Connection
io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    // Handle user registration
    socket.on('registerUser', (name) => {
        users[socket.id] = name; // Store username with socket ID
        io.emit('userJoined', { name, message: `${name} has joined the chat!` });
        console.log(`${name} joined`);
    });

    // Send previous messages when a user connects
    Message.find().sort({ createdAt: 1 }).then((messages) => {
        socket.emit('previousMessages', messages);
    });

    // Handle sending messages
    socket.on('newMessage', async (messageText) => {
        const name = users[socket.id]; // Get sender's name
        if (!name) return;

        const messageData = { name, message: messageText };
        const message = new Message(messageData);
        await message.save();

        io.emit('message', messageData); // Broadcast to all users
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        const name = users[socket.id];
        if (name) {
            io.emit('userLeft', { name, message: `${name} has left the chat.` });
            console.log(`${name} disconnected`);
        }
        delete users[socket.id];
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
