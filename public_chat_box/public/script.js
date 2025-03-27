const socket = io('http://localhost:5000');

let username = '';

function registerUser() {
    username = document.getElementById('username').value.trim();
    if (username) {
        document.querySelector('.name-input').style.display = 'none';
        document.getElementById('chatBox').style.display = 'flex';
        socket.emit('registerUser', username);
    }
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (messageText && username) {
        socket.emit('newMessage', messageText);
        messageInput.value = '';
    }
}

// Listen for messages from server
socket.on('message', (data) => {
    displayMessage(data.name, data.message, data.name === username ? 'user' : 'other');
});

// Show previous messages
socket.on('previousMessages', (messages) => {
    messages.forEach(msg => displayMessage(msg.name, msg.message, msg.name === username ? 'user' : 'other'));
});

// Notify when a user joins
socket.on('userJoined', (data) => {
    displayMessage('System', data.message, 'other');
});

// Notify when a user leaves
socket.on('userLeft', (data) => {
    displayMessage('System', data.message, 'other');
});

// Function to display messages
function displayMessage(name, message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.innerHTML = `<strong>${name}:</strong> ${message}`;
    document.getElementById('messages').appendChild(messageDiv);
}
