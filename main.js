const express = require('express');
const app = express();

connectedCount = 0;
ipsConnected = [];


function arrayRemove(arr, value) {

   return arr.filter(function(ele){
       return ele != value;
   });

}

var server = app.listen(80,()=>{
  console.log("running on localhost:80");
});

const io = require("socket.io")(server);

app.use(express.static('public'));

io.on("connection",(socket)=> {
  var address = socket.handshake.address;
  if(ipsConnected.includes(address.address) == false)
  {
      ipsConnected.push(address.address);
        connectedCount+=1;
  }


    io.emit("count",(connectedCount));
  socket.on('chat',(data)=>{
    io.emit('chat',data);
  });
  socket.on("game",(data)=>{
    io.emit('game',data);
  })
});

io.on("disconnect",(socket)=>{
    var address = socket.handshake.address;
  connectedCount-=1;
  ipsConnected = ipsConnected.arrayRemove(ipsConnected,address.address);
  io.emit("count",(connectedCount));
});
