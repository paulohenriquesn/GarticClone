const express = require('express');
const app = express();

var server = app.listen(80,()=>{
  console.log("running on localhost:80");
});

const io = require("socket.io")(server);

app.use(express.static('public'));

io.on("connection",(socket)=> {
  socket.on('chat',(data)=>{
    io.emit('chat',data);
  });
  socket.on("game",(data)=>{
    io.emit('game',data);
  })
});
