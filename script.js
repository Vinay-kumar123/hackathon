const socket = io();
const editor = document.getElementById('editor');

// When the text is updated by others, reflect the changes
socket.on('textChanged', (newText) => {
  editor.value = newText;
});

// Send changes to the server as the user types
editor.addEventListener('input', () => {
  socket.emit('textChanged', editor.value);
});

// Load the initial text when the user joins
socket.on('loadText', (text) => {
  editor.value = text;
});
