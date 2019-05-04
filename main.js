const express = require('express');
const app = express();

const port = 3000;
const http = require("http").createServer();

const io = require("socket.io")(http);

var server = app.listen(80,()=>{
  console.log("running on localhost:80");
});

app.use(express.static('public'));

io.on("connection",(socket)=> {
  socket.on('chat',(data)=>{
    io.emit('chat',data);
  });
  socket.on("game",(data)=>{
    io.emit('game',data);
  })
});

http.listen(port,()=>{
  console.log("server running!");
});
