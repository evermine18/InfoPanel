const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 80
var lines = []

app.get('*', (req, res) => {
    if(req.url=="/admin"){
      res.sendFile(__dirname + '/public/'+req.url+".html");
    }else{
      res.sendFile(__dirname + '/public/'+req.url);
    }
  });
io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit("updateLines",JSON.stringify({"lines":lines}));
  socket.on('newLine', (msg) => {
    var newLine =JSON.parse(msg);
    addLine(newLine["newLine"])
    console.log(newLine["newLine"])
    io.emit('updateLines', JSON.stringify({"lines":lines}));
  });
  socket.on('removeLines', (msg) => {
    console.log("remove");
    lines=[];
    io.emit('updateLines', JSON.stringify({"lines":lines}));
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
server.listen(port, () => {
  console.log('listening on *:'+port);
});
function checkLines(){
  var now = new Date();
  for(i in lines){
    var lineDate = new Date(lines[i][3]+" "+lines[i][2]);
    if(lineDate<now){
      lines.pop(i);
    }
  }
  io.emit('updateLines', JSON.stringify({"lines":lines}));
}
var t=setInterval(checkLines,5000);
function addLine(line){
  if(lines.length==0){
    lines.push(line);
  }else{
    for(i in lines){
      if(lines[i][2]>=line[2]&&lines[i][3]>=line[3]){
        lines.splice(i, 0, line);
        console.log("si")
      }else if(i==lines.length-1){
        lines.splice(i+1, 0, line);
      }
    }
  }
  
}