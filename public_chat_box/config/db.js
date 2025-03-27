const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/chatbox'; // Your local database

mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

module.exports = mongoose;
