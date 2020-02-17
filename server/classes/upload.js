//nodejs modules
const rutas=  require('path');

//npm dependences
const uuid  =require('uuid/v4');
const fileUpload = require('express-fileupload');
const   _= require('underscore');
//helpers
const {validExtension, saveImage  ,eliminarImagen}  = require('../lib/helpers');
//Bd
const Usuario =  require('../models/usuario.model');
const  Entrada =  require('../models/entrada.model');


class  ControlUpload {

    constructor(app){
     app.use(fileUpload()); 
    }
    
    /**METODOS 
     * subir imagen
     * servir imagenes
     * buscar imagen(s) por blog
     */
  uploadImageBlog(idPost , file) {
       ///recibir el id del post
        let pathUpload =  'uploads/posts/';
        return new Promise( async (resolve , reject) => {
            
     let rptaExtension = validExtension(file.name);
     if(!rptaExtension){
         return reject( { ok : false , error : 'extension no valida'});   
     }   
     //guardar el archivo
     let post = await Entrada.findById(idPost).catch(err=>{ 
     reject({ ok :false ,  err});
     });
     let imagesAux;
     let NumImages;
     if(_.isNull(post)){
         return  reject({ ok : false , err : 'not found Object'})
     }
     if(!_.isNull(post['images'])){
        imagesAux =  post.images;
        NumImages =  imagesAux.length; 
     }else{
        NumImages = 0 ;
        imagesAux = [];
     }
     //nombre de la imagen
     NumImages++;
     let name =  `${idPost}-${NumImages}.${rptaExtension}`;
     pathUpload =  pathUpload.concat(name);
     let path = '/posts/'+name;
     //guardar la  imagen
     await saveImage(file , pathUpload).catch (err =>{
          reject( { ok : false , err});
     });
     imagesAux.push(pathUpload);
     let updatePost =await Entrada.findByIdAndUpdate(idPost , { images : imagesAux } );
     if(updatePost){       
             resolve( { ok   : true  , messaje : 'agregado correctamente' , path  : path});
     }
 }); //end promise
  }//end function

  uploadImageUsuario(idUs , file) {
              ///recibir el id del post
           let pathUpload =  'uploads/usuarios/';
           return new Promise( async (resolve , reject) => {
                  
           let rptaExtension = validExtension(file.name);
           if(!rptaExtension){
               return reject( { ok : false , error : 'extension no valida'});   
           }   
           //guardar el archivo
           let usuario = await Usuario.findById(idUs).catch(err=>{ 
           reject({ ok :false ,  err});
           });
            //ruta de la imagen anterior
            let imageAnt = usuario.img; 
           let name =  `${idUs}-${uuid()}.${rptaExtension}`;
           pathUpload =  pathUpload.concat(name);
           let path = '/usuarios/'+name;
           //guardar la  imagen
           await saveImage(file , pathUpload).catch (err =>{
                reject( { ok : false , err});
           });
           let updateUs =await Usuario.findByIdAndUpdate(idUs , { img : path} );
           if(updateUs){       
                    //eliminar imagen anterior
                     eliminarImagen( rutas.join(__dirname , '../../uploads'+imageAnt ));
                    // eliminarImagen(rutas.join(__dirname , '' ));
                   resolve( { ok   : true  , messaje : 'agregado correctamente' , path  : path});
           }
       }); //end promise
  }
}

module.exports  = {
     ControlUpload
}
