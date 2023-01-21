var socket = io();
document.getElementById("data").valueAsDate = new Date();
function afegirRuta(){
    if(document.getElementById("hora").value<24 && document.getElementById("minuts").value<60){
        var ruta=document.getElementById("ruta").value;
        var desti=document.getElementById("desti").value;
        var hora=document.getElementById("hora").value+":"+document.getElementById("minuts").value;
        var data=document.getElementById("data").value;
        var via=document.getElementById("via").value;
        var msg={"newLine":[ruta,desti,hora,data,via]};
        socket.emit('newLine', JSON.stringify(msg));
    }else{
        alert("Hora inválida")
    }
    
}
function removeLines(){
    socket.emit('removeLines', "");
}