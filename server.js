const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const http = require('http');
const messageFormat = require('./utils/message.format')

const app = express();
const server = http.createServer(app);
const io = socketIO(server)

app.use(express.static(path.join(__dirname, 'public')))

const PORT = 3000 || process.env.PORT;
const chatbotName = 'ربات'

io.on('connection', (socket) => {

  socket.on("joinRoom", ({ username, room }) => {
    console.log(username + ' ' + room);

  })
  socket.emit('message', messageFormat(chatbotName, 'خوش آمدید'))

  socket.broadcast.emit('message', messageFormat(chatbotName, 'کاربر به چت پیوست'))

  socket.on('disconnect', () => {
    io.emit('message', messageFormat(chatbotName, 'کاربر چت را ترک کرد'))
  })

  socket.on('chatMessage', (message) => {
    io.emit('message', messageFormat("کاربر", message))
  })

});

server.listen(PORT, () => {
  console.log(`server is on port ${PORT}`);

})