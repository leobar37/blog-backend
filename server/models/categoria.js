const  {Schema ,model  } = require('mongoose');

let categoria = new Schema({
 
    nombre : { 
        type :String, 
        required : true
    },
    tags : [String] ,
    descripcion :{type :String},
    date  :  {  type :  Number}
});



module.exports  = model('Categoria' ,  categoria);
