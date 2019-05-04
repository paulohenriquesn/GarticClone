const express = require('express');
const app = express();

connectedCount = 0;
var allClients = [];

var server = app.listen(80,()=>{
  console.log("running on localhost:80");
});

const io = require("socket.io")(server);

app.use(express.static('public'));

io.on("connection",(socket)=> {
	 allClients.push(socket);
	  io.emit("count",(allClients.length));
  socket.on('chat',(data)=>{
    io.emit('chat',data);
  });
  socket.on("game",(data)=>{
    io.emit('game',data);
  })
});

io.on("disconnect",(socket)=>{
    console.log('Got disconnect!');

      var i = allClients.indexOf(socket);
      allClients.splice(i, 1);
  io.emit("count",(allClients.length));
});
