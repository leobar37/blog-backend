const express = require('express')
const app =  express();

const path =  require('path');
const morgan = require('morgan');
const bodyParser =require('body-parser');
const cors = require('cors');
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
app.set('port', process.env.PORT || 8888); 

//CONFIGURATION FOR ALL ROUTES COURS
app.all('*' , cors());
app.use(express.static(path.join( __dirname , '../uploads' )));
app.use(express.static(path.join( __dirname , '../public' )));



app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())
app.use(morgan('tiny'));

app.use(require('./routes/index'));


module.exports = {
     app
}