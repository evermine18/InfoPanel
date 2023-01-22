updateHour();
var t=setInterval(updateHour,1000);
var socket = io();
socket.on('updateLines', function(msg) {
    var data = JSON.parse(msg);
    var table = document.getElementById("linesList");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    for(var i = data["lines"].length-1;i>=0;i--){
        console.log(i)
        var row = table.insertRow(1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML=lineDivGenerator(data["lines"][i][0]);
        cell2.innerHTML="<h1 class='info'>"+data["lines"][i][1]+"</h1>";
        cell3.innerHTML="<h1 class='info'>"+data["lines"][i][2]+"</h1>";
        cell4.innerHTML="<h1 class='info'>"+data["lines"][i][4]+"</h1>";
    }

    
});
var aspectRatio = 16/9;
var div = document.getElementById("content");

function setDivHeight() {
    console.log("si")
  div.style.height = div.offsetWidth / aspectRatio + "px";
}

setDivHeight();
window.addEventListener("resize", setDivHeight);
function lineDivGenerator(name){
    if(name=="R6"){
        return "<div class='linea'><h1 class='lineaText'>R6</h1></div>";
    }
    else if(name=="R5"){
        return "<div class='linea' style='background-color: #309CB2;''><h1 class='lineaText'>R5</h1></div>"
    }else if(name=="S1"){
        return "<div class='linea' style='background-color: #EC6709;''><h1 class='lineaText'>S1</h1></div>"
    }else if(name=="S2"){
        return "<div class='linea' style='background-color: #88BD24;''><h1 class='lineaText'>S2</h1></div>"
    }else if(name=="S3"){
        return "<div class='linea' style='background-color: #448E99;''><h1 class='lineaText'>S3</h1></div>"
    }else if(name=="S4"){
        return "<div class='linea' style='background-color: #9B8202;''><h1 class='lineaText'>S4</h1></div>"
    }else if(name=="S8"){
        return "<div class='linea' style='background-color: #3CBADC;''><h1 class='lineaText'>S8</h1></div>"
    }else if(name=="S9"){
        return "<div class='linea' style='background-color: #EB4B6F;''><h1 class='lineaText'>S9</h1></div>"
    }else if(name=="L12"){
        return "<div class='metro' style='background-color: #BFBEE0;''><h1 class='lineaText'>L12</h1></div>"
    }else if(name=="L8"){
        return "<div class='metro' style='background-color: #E796BF;''><h1 class='lineaText'>L8</h1></div>"
    }else if(name=="L7"){
        return "<div class='metro' style='background-color: #A04B09;''><h1 class='lineaText'>L7</h1></div>"
    }else if(name=="L6"){
        return "<div class='metro' style='background-color: #7775B5;''><h1 class='lineaText'>L6</h1></div>"
    }else{
        return "<div class='linea'><h1 class='lineaText'>?¿</h1></div>";
    }
}
function updateHour(){
    var today = new Date();
    document.getElementById("timer").innerHTML=today.getHours() + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes();    
}