const mongoose =require ('mongoose');

const Schema = mongoose.Schema;
// const { PORTADA ,RELEVANTE }  =require('../keys');
let imagen = new Schema( {    
    tamaño : {type : String} ,
    imagenes : [String],
    importancia : {type : String}
})



module.exports =mongoose.model('Imagen' , imagen);