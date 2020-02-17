const Entrada = require('../models/entrada.model');
const path =  require('path');
/*=============================================
=            metodos de la base de datos           =
=============================================
 
listar las entradas (paginadas)
buscar una entrada por id 
crear una entrada
eliminar una entrada
ocultar una entrada 
listar imagenes de una entrada
listar extracto de una entrada
*/
class EntradaCont {
    
  constructor(){     
  }
  listarEntradas(desde, hasta){
     return new Promise(( resolve , reject)=>{
        Entrada.find({}).skip(desde).limit(hasta)  .exec((err,docs)=>{
            //error de base de datos
            if(err) reject({ ok : false,messaje: 'BD error'});
            resolve({ok :false , docs});
        }) 
     })
  }
  listarEntradasxTermino(desde, hasta, termino){
     return new Promise(( resolve , reject)=>{
       //expresion regular terminos 
      let rgx = new RegExp(termino , 'i');

        Entrada.find({title : rgx}).skip(desde).limit(hasta)  .exec((err,docs)=>{
            //error de base de datos
            if(err) reject({ ok : false,messaje: 'BD error'});
            resolve({ok :false , docs});
        }) 
     })
  }
  crearEntrada(data){ 
     return new Promise((resolve, reject)=>{
        let blog =  new Entrada({
            title: data.titulo,
            body : data.body,
            extracto : data.extracto,
            autor: data.autor, 
            keywords : data.keywords
        })
        blog.save( (err , entrada)=>{
           
            if(err) reject({ ok :false ,messaje: 'BD error'  ,err}); 
        
             if(entrada)  resolve({ ok : true, entrada});
        
        });//bd
  });//promesa
  
  }
  buscarEntrada(id){
    return new Promise((resolve, reject)=>{
    Entrada.findById(id, (err, entrada)=>{
        if(err) reject({ ok : false,messaje: 'BD error'});
        if(!entrada) reject({ ok : false,messaje: 'entrada no encontrada'});
         resolve({ ok : true  , entrada});
      });
    });
  }
   actualizarEntrada(id , data){
     return new Promise((resolve, reject)=>{

        Entrada.findByIdAndUpdate(id,{
            title: data.titulo,
            body : data.body,
            extracto : data.extracto,
            autor: data.autor, 
            keywords : data.keywords
        } , { new :  true} ,  (err , entrada)=>{
           
            if(err) reject({ ok :false ,messaje: 'BD error'}); 
            if(!entrada) reject({ ok : false,messaje: 'entrada no encontrada'});
            resolve({ ok : true, entrada});       
        });//bd
     });//promesa
  }
  //servir imagenes de posr
 getImagesPost(idPost) {
  return new Promise(async (resolve , reject)=>{

       let entrada = await  Entrada.findById(idPost).catch(err=> reject ( { 
           ok  : false , err
        }))
        if(!entrada ||  !entrada.images){
          return reject({ ok  : false   ,  messaje : 'no image'});
        }else{
           resolve({ok:false , images : entrada['images'] });
        }         
  });//end promise 
 }
}

module.exports =  {
    EntradaCont
}