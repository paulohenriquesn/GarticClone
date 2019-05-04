const express = require('express');
const app = express();

function getRandomArrayElement(arr){
    //Minimum value is set to 0 because array indexes start at 0.
    var min = 0;
    //Get the maximum value my getting the size of the
    //array and subtracting by 1.
    var max = (arr.length - 1);
    //Get a random integer between the min and max value.
    var randIndex = Math.floor(Math.random() * (max - min)) + min;
    //Return random value.
    return arr[randIndex];
}

connectedCount = 0;
var allClients = [];

var temas = ["carro","melancia"];

var server = app.listen(80,()=>{
  console.log("running on localhost:80");
});

var ingame = false;
var tempToRemove = 0;
var temp = 30;

const io = require("socket.io")(server);

app.use(express.static('public'));

io.on("connection",(socket)=> {

  connectedCount +=1;
	 allClients.push(socket);
	  io.emit("count",(allClients.length));

  socket.on('chat',(data)=>{
    io.emit('chat',data);
  });

  socket.on("game",(data)=>{
    io.emit('game',data);
  });

  socket.on("update",(data)=>
{
  if(temp>0)
  {
    if(tempToRemove<=500){
    tempToRemove = tempToRemove +1;
  }else{
    temp = temp -=1;
    tempToRemove = 0;
  }
}
    io.emit("updated",{gameUpdated:true,time:temp});
});

io.on("disconnect",(socket)=>{
  connectedCount-=1;
    console.log('Got disconnect!');
      var i = allClients.indexOf(socket);
      allClients.splice(i, 1);
  io.emit("count",(allClients.length));
});


  if(connectedCount>=2 && ingame==false){
    ingame = true;
    temp = 30;
    tempToRemove = 0;
    io.emit("startgame",{
      tempo:temp,
      istrue:ingame,
      tema:getRandomArrayElement(temas)
    });
  }
});
