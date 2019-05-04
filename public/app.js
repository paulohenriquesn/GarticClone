var socket = io.connect("localhost:80");

/*function filterNullValues (i) {
  return (i!=null);
}
$("#usersConnected").text("Usuarios Conectados: " + io.sockets.clients().filter(filterNullValues).length);
*/

var tema = "";
var timegame = 0;

socket.on("startgame",(data)=>
{
  timegame = data["tempo"];
  tema = data["tema"];
  console.log("tempo do jogo: " + timegame);
  socket.emit("update",{iNeedAnUpdate:true});
  if(timegame <=)
});

socket.on("updated",(data)=>
{
    timegame = data["time"];
    socket.emit("update",{iNeedAnUpdate:true});
    $("#timeGame").text("Tempo restante: " + timegame + "s");
    $("#Tematext").text("Tema: " + tema + "s");
});

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
  background('white');
    background(props.bkcolor);
});

socket.on("chat",(data)=>{
  $("#chat").append("<li style='list-style:none; font-family:'Roboto';'><font color='white'>" + data['name'] + " disse " + data['msg'] + "</font></li>");
});

socket.on("game",(data)=>{
  if(data != "clear")
  {
    ellipse(data['x'],data['y'],data['size'],data['size']);
  }
});

var props = {
  bkcolor: 'white'
};

function mouseDragged() {
var c = color('black');
    fill(c);
    noStroke();
    data = {x:mouseX,y:mouseY,size:5};
  //  socket.emit("game",{x:mouseX,y:mouseY,size:5});
    ellipse(data['x'],data['y'],data['size'],data['size']);
}

function setup(){
  var canvas = createCanvas(640,360);
     canvas.parent('sketch-holder');
  background('white');
}
