const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Chats = require('./models/ChatsMonggo')
require('dotenv/config')

const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: "*"
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', function(){
    io.emit('usersChanged', {user: socket.username, event: 'left'});
  });

  socket.on('input-chat', async (room_id) => {
    let where = { room_id: room_id };
    let data = await Chats.find(where);
    io.emit('chatChanged', {data: data, event: 'joined'});
  });
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});
  });

  socket.on('set-name', (name) => {
    socket.username = name;
    console.log(name)
    io.emit('users-changed', {user: name, event: 'joined'});
  });
});

async function main() {
  await mongoose.connect(process.env.DB_CONNECT);
  console.log('mongodb connected');
}

server.listen(process.env.DB_CONNECT | 3001, async () => {
  console.log('listening on *:3001');
  console.log('Server running in port 3001');

  main().catch(err => console.log(err));
});



// db.sequelize.sync().then((req) => {
//   app.listen(3001, async () => {
//     try {
//       await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }
//
//     console.log('Server running in port 3001');
//   });
// });
