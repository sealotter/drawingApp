
const path = require('path');
const express = require('express');
const app = express();
//node index.js
const port = process.env.PORT || 5000
const httpServer = require('http').createServer(app)
app.listen(port,() => console.log(`listening on port ${port}`))


const io = require('socket.io')(httpServer)

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
  setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

})





app.use(express.static(path.join(__dirname, '/../client/canvasfun/build')))
//app.use('/public', express.static(path.join(__dirname, '../client/public')))



//../client/canvasfun/build

app.get('*', (req, res) => {
  console.log('response recieved')
  res.sendFile(path.join(__dirname, '../client/canvasfun', 'build', 'index.html'))
}); 