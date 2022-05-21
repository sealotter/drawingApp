
const path = require('path');
const express = require('express');
const app = express();
//node index.js
const port = process.env.PORT || 5000
const server = app.listen(port,() => console.log(`listening on port ${port}`))


const io = require('socket.io')(server)

//require('./socket')(io)

io.on('connection', (socket) => {
  console.log('--server socket', socket.id, 'online')
  socket.on('image-data', (data) => {
    //broadcast image to all connected users
    socket.broadcast.emit('image-data', data)
  })
  socket.on('close', () => {
    console.log(`socket connection with id ${socket.id} has DISCONNECTED`)
  })
})





app.use(express.static(path.join(__dirname, '/../client/canvasfun/build')))
//app.use('/public', express.static(path.join(__dirname, '../client/public')))



//../client/canvasfun/build

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/canvasfun', 'build', 'index.html'))
}); 