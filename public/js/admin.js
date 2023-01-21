var socket = io();
document.getElementById("data").valueAsDate = new Date();
function afegirRuta(){
    var ruta=document.getElementById("ruta").value;
    var desti=document.getElementById("desti").value;
    var hora=document.getElementById("hora").value+":"+document.getElementById("minuts").value;
    var data=document.getElementById("data").value;
    var via=document.getElementById("via").value;
    var msg={"newLine":[ruta,desti,hora,data,via]};
    socket.emit('newLine', JSON.stringify(msg));
}