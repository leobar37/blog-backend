require('./config/config');
const express = require('express')
const app =  express();
const path =  require('path');
const  mongoose =   require('mongoose');
const morgan = require('morgan');
const bodyParser =require('body-parser');



//declaraciones
app.set('port', process.env.PORT || 8888); 

//configuraciones



//configuraciones de middlewares
app.use(express.static(path.resolve(__dirname , '../public')));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())
app.use(morgan('tiny'));

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
app.use(require('./routes/index'));
//correr puerto |
app.listen( app.get ('port')  ,()=> {
 console.log('Listen in port'+ app.get('port'));
})







