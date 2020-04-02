require('./config/config');
const { app} =require('./app');
const  mongoose =   require('mongoose');
const  http = require('http');



//declaraciones
//configurationa
//configuracion de base de datos
const rptaBd  =  async ()=> {
  return await mongoose.connect (process.env.urlDb ,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : false
  }) ;      
}
console.log('-----------Respuesta de la base de datos -- -');
rptaBd().then(Data => {
  console.log('Base de datos conectada');
}).catch(err => {
  console.log('Error en la conexion' , err);
});
//rutas

const server = http.createServer(app);
const io =  require('socket.io')(server);
io.on('connection', ()=>{
  console.log('sockets conectados');
})
//correr puerto |
server.listen(app.get('port') , ()=>{
  console.log('listen in port : ' + app.get('port'));
  
})






