const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor de sockets');
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor de sockets');
});

// const messageInput = document.getElementById('chatBox');
// const messageLogs = document.getElementById('messageLogs');

// const token = localStorage.getItem('token');
// if (!token) {
//   window.location.href = 'http://localhost:8080/login';
// } else {
//   initializeChat();
// };

let user;
const chatBox = document.getElementById('chatBox');

swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresa el usuario para identificarte en el caht',
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre de usuario"
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user);
});

chatBox.addEventListener('keyup', evt => {
    if(evt.key === 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', {user, message: chatBox.value});
            chatBox.value = "";
        };
    };
});

socket.on('messagesLogs', data => {
    let log = document.getElementById('messageLogs');
    let messages = "";
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br/>`;
    });
    log.innerHTML = messages;
});

socket.on('newUserConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'succes'
    });
});

