const Entrada = require('../models/entrada.model');
const Usuario = require('../models/usuario.model');
const Imagen = require('../models/imagenes');
const fs  = require('fs');
const path = require('path');
const d3 = require('d3-time');
const { elimanarImagenes} = require('../lib/helpers');
class EntradaCont {
  constructor(){}
  listarEntradas(desde, hasta){
     return new Promise(( resolve , reject)=>{
        Entrada.find({})
        .populate('images')
        .populate('autor' , 'nombre') 
        .skip(desde).limit(hasta).exec((err,docs)=>{
            //error de base de datos
            if(err) reject({ ok : false,messaje: 'BD error'});
            resolve({ok :true , docs});
        }) 
     })
  }
  listarEntradasxTermino(desde, hasta, termino){
     return new Promise(( resolve , reject)=>{
       //expresion regular terminos 
      ///buscar etradas mas recientes
      let rgx = new RegExp(termino , 'i');
        Entrada.find({title : rgx}).skip(desde).limit(hasta).populate('autor').exec((err,docs)=>{
            //error de base de datos
            if(err) reject({ ok : false,messaje: 'BD error'});
            resolve({ok :false , docs});
        }) 
     })
  }
  //recibe el tipo de post (mas vistos, mas recientes, y toodos)
  listarPostPrincipal( tipo){
    return new Promise( async( resolve , reject)=>{
         /*=============================================
         =            funciones            =
         =============================================*/
         let buscar = async (condicion)=>{
          let docs  = await  Entrada.find({}).populate('autor').populate('images');
           return docs;  
           }
            let postsDestacados = async () =>{
              let todos =  await buscar({});   
                todos = todos.sort( function (a  , b){
                  let antes =   new Date(a.fechaPublicacion);
                  let despues = new Date(b.fechaPublicacion);
                  return antes > despues;
                })
            return todos;
           }
        if(tipo == 'ordenado'){
          let docs =   await postsDestacados();
          resolve({ok :true , docs});
        }
    })
 }
  crearEntrada(data){ 
      const {autor}  = data;
     return new Promise((resolve, reject)=>{
        let blog =  new Entrada({
            title: data.titulo,
            body : data.body,
            extracto : data.extracto,
            autor: autor, 
            keywords : data.keywords,
            tipoblog : data.tipo,
            fechaPublicacion : data.fecha,
            autor :  data.autor
        });
        blog.save( async (err , entrada)=>{
            if(err) reject({ ok :false ,messaje: 'BD error'  ,err}); 
             if(entrada){
                 let id =entrada._id;
                 let us = await Usuario.findById(autor);
                 let blogm  =us.blogs;
                 blogm.push(id);
                 let usActualizado =   await Usuario.findByIdAndUpdate(autor,{blogs :  blogm } ,  { new : true });                                                         
                resolve({ ok : true, entrada , usActualizado});
             }    
        });//bd
  });//promesa
}
  buscarEntrada(id){
    return new Promise((resolve, reject)=>{
    Entrada.findById(id, (err, entrada)=>{
        if(err) reject({ ok : false,messaje: 'BD error'});
        if(!entrada) reject({ ok : false,messaje: 'entrada no encontrada'});
         resolve({ ok : true  , entrada});
      }).populate('autor').populate('images');
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
  eliminarEntrada(id){
      return new Promise( async (resolve , reject)=>{
        const entrada  = await Entrada.findByIdAndDelete(id).catch(err=>{
            reject({ok: false , err})
        })
         if(entrada){
          let pat = path.join(__dirname , '../../uploads/posts/')
        for(const  imagen of  entrada.images) {
             let imagenBorrada = await Imagen.findByIdAndDelete(imagen);
           if(imagenBorrada)
           await elimanarImagenes(imagenBorrada.imagenes ,  pat);
        }
          resolve({ok: true , entrada});
         }else{
           reject( { ok :  false , messaje : 'entrada no encontrada'  })
         }
      });
  }
  listarEntradasporAutor(idAutor){
      return new Promise( async (resolve , reject)=>{
          let usuario = await Usuario.findById(idAutor).populate('blogs')
          .catch(err => reject({ok: false , err}));
          resolve({ ok : true , usuario});

      });
  }
}
module.exports={EntradaCont}