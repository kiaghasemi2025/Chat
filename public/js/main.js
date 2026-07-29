const chatForm = document.getElementById("chat-form")
const chatMessage = document.querySelector(".chat-messages")

const {username , room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

const socket = io();

socket.emit("joinRoom" ,{username,room})

socket.on('message', (message) => {
    outputMessage(message)
    chatMessage.scrollTop = chatMessage.scrollHeight
})

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msgInput = document.getElementById("msg");
    const message = msgInput.value
    socket.emit('chatMessage', message)

    msgInput.value = ''
    msgInput.focus()
})

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = 
    `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text"> ${message.text}</p>`

    document.querySelector('.chat-messages').appendChild(div)
}