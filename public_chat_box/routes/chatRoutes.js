const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Route to get all messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Route to post a new message
router.post('/messages', async (req, res) => {
    try {
        const { name, message } = req.body;
        if (!name || !message) {
            return res.status(400).json({ error: 'Name and message are required' });
        }

        const newMessage = new Message({ name, message });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

module.exports = router;
