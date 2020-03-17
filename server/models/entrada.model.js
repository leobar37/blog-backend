const mongoose =require ('mongoose');
const { format, render, cancel,  register } =  require('timeago.js');

const Schema = mongoose.Schema;
// const { PORTADA ,RELEVANTE }  =require('../keys');
let blog  = new Schema( {    
    tipoblog : {
     type : Number,   
    },
    title: {
       type :String ,
       required  : [ true , 'El titulo de su entrada es requerida']
    } ,
    images : [ { type : Schema.Types.ObjectId  , ref : 'Imagen'}],
    body : {
      type : String
    },
    categoria : { type : String  },
    extracto : {
       type:  String,
      //  required : [true , 'El extracto del blog es necesario']
    },
    autor: {
      type: Schema.Types.ObjectId, 
       ref : 'Usuario'
     },
     fechaPublicacion:  {
        type : Number,

      //   default :  String
     },
     visible :  {
        type :  Boolean,
        default : true
     },
     keywords: {
        type  : [String]
     }

})

// function  trDate(value){
//      let  timeAGO =  format(value); 
//    return  132324;
// }
blog.methods.toJSON =  function(){
    let blog =  this;
    let entrada = blog.toObject();
    entrada.fechaPublicacion =  format(entrada.fechaPublicacion); 
    return entrada;
}

module.exports =mongoose.model('Entrada' , blog);