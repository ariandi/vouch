const express = require('express');
const app = express();
// const db = require('./models');
const { Chats } = require('./models');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vouchdb', 'root', '433205ari', {
  host: 'localhost',
  dialect: 'mysql', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

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
    let data = await Chats.findAll({where});
    io.emit('chatChanged', {data: data, event: 'joined'});
  });
});

// app.get('/', (req, res) => {
//   res.status(200);
//   // res.headers.append("content-type", "application/json");
//   res.set('Content-Type', 'text/plain');
//
//   const content = 'Hello world';
//   res.send({content});
// });
//
// app.get('/chats', async (req, res) => {
//
//   res.status(200);
//   res.set('Content-Type', 'text/plain');
//
//   let message = 'Success';
//   let code = '00';
//   let data = [];
//
//   try {
//     const result = await Chats.findAll();
//     data = result;
//   } catch (e) {
//     console.log(e);
//     message = JSON.stringify(e);
//     code = '01';
//     res.status(500);
//   }
//
//   res.send({message, code, data});
// });
//
// app.post('/chats', async (req, res) => {
//
//   res.status(200);
//   res.set('Content-Type', 'text/plain');
//
//   let message = 'Success';
//   let code = '00';
//
//   try {
//     const result = await Chats.create({
//       username: "fio",
//       room_id: "room_001",
//       message: "test saja lagi"
//     });
//     console.log("Jane's auto-generated ID:", result.id);
//   } catch (e) {
//     console.log(e);
//     message = JSON.stringify(e);
//     code = '01';
//   }
//
//   res.send({message, code});
// });



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

server.listen(3001, async () => {
  console.log('listening on *:3002');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  console.log('Server running in port 3001');
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
