// Add event listeners for send button and Enter key press in input field
document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Function to handle sending a message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText) {
        // Display the message bubble
        displayMessage(messageText, 'sent');
        
        // Clear the input field
        messageInput.value = '';
        
        // Scroll to the bottom of the chat
        const chatBox = document.getElementById('chatBox');
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Function to display a message bubble in the chat
function displayMessage(message, type) {
    const chatBox = document.getElementById('chatBox');

    // Create a new div for the message bubble
    const messageBubble = document.createElement('div');
    messageBubble.classList.add('outgoing-chats'); // Adjust this class for your style

    // Create the inner content for the message bubble
    const messageContent = document.createElement('div');
    messageContent.classList.add('outgoing-chats-msg');
    messageContent.innerHTML = `
        <p>${message}</p>
        <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;

    // Append the message content to the message bubble
    messageBubble.appendChild(messageContent);
    
    // Append the message bubble to the chat box
    chatBox.appendChild(messageBubble);
}
