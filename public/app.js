var socket = io.connect("http://localhost:3000");

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
  $("#chat").append("<li>" + data['name'] + ":" + data['msg'] + "</li>");
});

socket.on("game",(data)=>{
  if(data != "clear")
    rect(data['x'],data['y'],data['size'],data['size']);
    else {
      background('white');
        background(props.bkcolor);
    }
});

var props = {
  mouseX: 0,
  mouseY: 0,
  Draw: false,
  bkcolor: 'gray'
};
  $("body").ready(function(){
$("body").mouseup(function(){
    props.Draw = false;
});
$("body").mousedown(function(){
    props.Draw = true;
});
});

$('body').mousemove((event)=>{
  props.mouseX = event.clientX;
  props.mouseY = event.clientY;
  if(props.Draw == true){
    var c = color('white');
    fill(c);
    noStroke();
    socket.emit("game",{x:props.mouseX-10,y:props.mouseY-150,size:5});
  }
});

function setup(){
  createCanvas(640,360);
  background('gray');
}
