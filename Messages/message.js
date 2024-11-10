
document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value.trim();

    if (message) {
        displayMessage(message, 'sent');
        messageInput.value = '';  // Clear the input field
        document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight; // Scroll to the bottom
    }
}

function displayMessage(message, type) {
    var chatBox = document.getElementById('chatBox');
    var messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
}