Game_Manager = {
	Users: 0,
	Rooms: {
		"Alimentos": {
			RoomName: "Alimentos",
			Users: [],
			Max: 10,
			Chat: [],
			info: {
				currentDraw: null,
				theme:null,
				time:0,
				maxtime:1024
			}
		},
		"Objetos": {
			RoomName: "Objetos",
			Users: [],
			Max: 10,
			Chat: [],
			info: {
				currentDraw: null,
				theme:null,
				time:0,
				maxtime:1024
			}
		}
	},
	
	InRoom: [],
	WhatRoom: []
};

// Struct
const express = require("express");
var app = express();

var server = app.listen(80,()=> {
	console.log("Server Initialized!")
});

app.use(express.static('./public'));
//

const io = require('socket.io')(server);

//Socket
io.on("connection",(socket)=> {
	Game_Manager.Users = io.engine.clientsCount;
	socket.emit("tick",Game_Manager);

	socket.on("checkUserRoom",() =>{
		let ip  = socket.request.connection.remoteAddress;
		if(Game_Manager.InRoom.includes(ip)){
		for(let i = 0; i < Game_Manager.InRoom.length;i++){
			if(Game_Manager.InRoom[i] == ip){
				socket.emit("responseRoomInfo",Game_Manager.Rooms[Game_Manager.WhatRoom[i]]);
			}
		}
		}else {
			socket.emit("userIsntARoom");
		}
	});

	//Requests
	socket.on("Request_RoomInfo",(data)=> {
		socket.emit("responseRoomInfo",Game_Manager.Rooms[data]);
	})
	socket.on("Request_ConnectRoom",(data) => {
		if(Game_Manager.Rooms[data.room].Users.length >= Game_Manager.Rooms[data.room].Max){
			console.log("lotado ok");
		}else{
			
			if(Game_Manager.Rooms[data.room].Users.length>0){
			for(let i = 0 ; i < Game_Manager.Rooms[data.room].Users.length;i++){
				if(!Game_Manager.Rooms[data.room].Users[i].ID == data.ID){
					Game_Manager.Rooms[data.room].Users.push(data.User);
					Game_Manager.InRoom.push(socket.request.connection.remoteAddress);
					Game_Manager.WhatRoom.push(data.room);
					socket.emit("RequestRoomAccept",data.room);
				}
			}
		}else{
			Game_Manager.Rooms[data.room].Users.push(data.User);
			Game_Manager.InRoom.push(socket.request.connection.remoteAddress);
			Game_Manager.WhatRoom.push(data.room);
			socket.emit("RequestRoomAccept",data.room);
		}

		} 
	});

});

io.on("connect",()=>{
		//Game_Manager.Users +=1;
});
	
io.on("disconnect",(socket)=> {
	/*if(Game_Manager.Users>0){
		Game_Manager.Users -=1;
	}*/
});