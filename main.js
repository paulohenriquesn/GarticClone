GameInfo = {
	currentPlayers: 0
}

UpdateInfo = () => {
	$("#playersPlayingText").text(`${GameInfo.currentPlayers} Pessoas Jogando`);
};

socket.on("RequestRoomAccept",(data) => {
	socket.emit("Request_RoomInfo",data);
	setTimeout(()=> {
		window.location.href = window.location.origin + "/draw/";
	},1000);
});

socket.on("responseRoomInfo",(data) => {
	console.log(data);
	$(`#users_${data.RoomName}`).text(`${data.Users.length}/${data.Max}`);
});

socket.on("tick",(data) => {
	GameInfo.currentPlayers = data.Users;
	socket.emit("Request_RoomInfo","Alimentos");
	UpdateInfo();
});

$("#alertNick").hide();
//https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

$("body").ready(()=> {
	 if(findGetParameter("errornick") != null){
	 	$("#alertNick").show();
	 } 
});

 function connectRoom () {
 	var getNick = $("#nickNameInput").val();
 	if(getNick.length<5){
 		window.location = window.location.origin + "?errornick";
 	}else{
		 let getroom = $("#playRoom").attr("room");
		 console.log(getroom);
 		socket.emit("Request_ConnectRoom",{
 			room:getroom,
 			User:{
 				Name: getNick,
 				Points: 0,
 				ID: socket.id
 			}
 		});
 	}
 }
