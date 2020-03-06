const mongoose =require ('mongoose');

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
    images : { 
       type : [String]
    },
    body : {
      type : String
    },
    extracto : {
       type:  String,
      //  required : [true , 'El extracto del blog es necesario']
    },
    autor: {
      type: Schema.Types.ObjectId, 
       ref : 'Usuario'
     },
     fechaPublicacion:  {
        type : String,

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



module.exports =mongoose.model('Entrada' , blog);