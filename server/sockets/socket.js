const { aumentarVisita} =require('./postEvents');
class Sockets{
    io;
    constructor(io){
     this.io = io;
     this.sockets();     
    }
   //seccion sockets
    sockets(){
      this.io.on('connection' ,( cliente )=>{
        aumentarVisita(cliente);
      })  
    }

}
module.exports = {
    Sockets
}