const mongoose =require ('mongoose');
const Schema = mongoose.Schema;
let blog  = new Schema( {

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
       required : [true , 'El extracto del blog es necesario']
    },
    autor: {
         type:String,
         required : [true , 'Es necesario saber de quien  es la entrada']
     },
     fechaPublicacion:  {
        type : Date,
        default :  Date.now
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