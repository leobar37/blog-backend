require('./config/config');
const express = require('express')
const app =  express();
const path =  require('path');
const  mongoose =   require('mongoose');
const morgan = require('morgan');
const bodyParser =require('body-parser');
const cors = require('cors');
//declaraciones
app.set('port', process.env.PORT || 8888); 
//configurationa
var whitelist = ['http://localhost:4200' , 'http://localhost:8888', 'http://example2.com'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
}
}
//CONFIGURATION FOR ALL ROUTES COURS
app.all('*' , cors());

//configuraciones de middlewares
app.use(express.static(path.join( __dirname , '../uploads' )));
// app.use(express.static(path.resolve(__dirname , '../public')));

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
app.listen( app.get('port')  ,()=> {
 console.log('Listen in port'+ app.get('port'));
})







