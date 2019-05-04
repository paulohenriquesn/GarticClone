var socket = io.connect("http://paulohenriquesn.com:80");

/*function filterNullValues (i) {
  return (i!=null);
}
$("#usersConnected").text("Usuarios Conectados: " + io.sockets.clients().filter(filterNullValues).length); 
*/

socket.on("count",(data)=>{
  $("#usersConnected").text("Usuarios Conectados: " + data);
});


$("#btnSend").click(()=> {
   socket.emit("chat",{
     name:$("#txtName").val(),
     msg:$("#txt").val()
   });
});

$("#btnClear").click(()=>{
  socket.emit("game","clear");
});

socket.on("chat",(data)=>{
  $("#chat").append("<li style='list-style:none; font-family:'Roboto';'><font color='white'>" + data['name'] + " disse " + data['msg'] + "</font></li>");
});

socket.on("game",(data)=>{
  if(data != "clear")
    ellipse(data['x'],data['y'],data['size'],data['size']);
    else {
      background('white');
        background(props.bkcolor);
    }
});

var props = {
  bkcolor: 'white'
};

function mouseDragged() {
var c = color('black');
    fill(c);
    noStroke();
    socket.emit("game",{x:mouseX,y:mouseY,size:5});
}

function setup(){
  var canvas = createCanvas(640,360);
     canvas.parent('sketch-holder');
  background('white');
}
