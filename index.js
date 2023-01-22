const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 80;
var canAdd=true;
var lines = [];
//Interval to avoid duplicated lines
setInterval(function(){canAdd=true; },2000);
//WebServer
app.get('*', (req, res) => {
    if(req.url=="/admin"){
      res.sendFile(__dirname + '/public/'+req.url+".html");
    }else{
      res.sendFile(__dirname + '/public/'+req.url);
    }
  });
//Socket connection
io.on('connection', (socket) => {
  console.log('Info: User connected');
  //Sending new info
  io.emit("updateLines",JSON.stringify({"lines":lines.slice(0,5)}));
  socket.on('newLine', (msg) => {
    //First we check if user can add a line
    if(canAdd){
      canAdd=false;
      var newLine =JSON.parse(msg);
      addLine(newLine["newLine"]); //Adding line to list
      console.log("New line: "+newLine["newLine"])
      io.emit('updateLines', JSON.stringify({"lines":lines.slice(0,5)})); //Sending change to all users
    }
  });
  //Clear all lines
  socket.on('removeLines', (msg) => {
    console.log("Info: Clearing lines");
    lines=[];
    io.emit('updateLines', JSON.stringify({"lines":lines.slice(0,5)}));
  });
  socket.on('disconnect', () => {
    console.log('Info: User disconnected');
  });
});
server.listen(port, () => {
  console.log('listening on *:'+port);
});
//Check every line and removes it
function checkLines(){
  var now = new Date();
  for(i in lines){
    var lineDate = new Date(lines[i][3]+" "+lines[i][2]);
    if(lineDate<now){
      lines.pop(i);
    }
  }
  io.emit('updateLines', JSON.stringify({"lines":lines.slice(0,5)}));
}
var t=setInterval(checkLines,5000);
//Adding new line by date
function addLine(line){
  if(lines.length==0){
    lines.push(line);
  }else{
    for(i in lines){
      if(lines[i][2]>=line[2]&&lines[i][3]>=line[3]){
        lines.splice(i, 0, line);
        break;
      }else if(i==lines.length-1){
        lines.splice(i+1, 0, line);
        break;
      }
    }
  }
  
}