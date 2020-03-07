//nodejs modules
const rutas=  require('path');
const  Imagen  =require('../models/imagenes');
//npm dependences
const uuid  =require('uuid/v4');
const fileUpload = require('express-fileupload');
const   _= require('underscore');
//helpers
const {validExtension, saveImage  ,eliminarImagen , elimanarImagenes }  = require('../lib/helpers');
//Bd
const Usuario =  require('../models/usuario.model');
const  Entrada =  require('../models/entrada.model');


class  ControlUpload {

    constructor(app){
     app.use(fileUpload()); 
    }
  uploadImageBlog(idPost , files , data) {
       ///recibir el id del post
       const { tamaño , importancia } = data;
       /*  crear una imagen  */
        let pathUpload =  'uploads/posts/';
        return new Promise( async (resolve , reject) => {
            //generar nombres de la imagenes
            //post al cual se le agregara el paquete de imagenes
            let post = await Entrada.findById(idPost).catch(err=>{ 
            reject({ ok :false , err});
            });
            let imagenesAguardar = [];
            for( const file of files){
            let rptaExtension = validExtension(file.name);
            if(!rptaExtension){
                return reject( { ok : false , error : 'extension no valida'});   
            }   
            let name =  `${uuid()}-${post._id}.${rptaExtension}`;
            imagenesAguardar.push(name);
          }
           //guardar imagenes
           await saveImage(files , pathUpload , imagenesAguardar);  
           let imagen =  new Imagen({
               tamaño : tamaño,
               imagenes :   imagenesAguardar,
               importancia: importancia
          })
           let  imgBd = await  imagen.save().catch(err=>{ 
          reject({ ok :false ,  err});
          });
         let imagenes = post.images;
          //actualizar el post
          imagenes.push(imgBd._id);
          let postNuevo =  await Entrada.findByIdAndUpdate(post._id , {images : imagenes}, {new : true });
         resolve({ ok : true , postNuevo , imgBd})
//
 }); //end promise
  }//end function

  uploadImageUsuario(idUs , files) {
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
             resolve( { ok   : true  , messaje : 'agregado correctamente' , path  : path});
           }
       }); //end promise
  }
  //editar imagenes
  //cambiar el nombre 
  editarImagenes(idImagen, files , data){
    //buscar el idImagen
    let pathUpload =  'uploads/posts/'; 
     return new Promise( async (resolve, reject)=>{
       const { tamaño  , importancia , postId} = data;
        let imagen = await  Imagen.findById(idImagen).catch(err=> {reject({ok : false ,  err})});
       //verificar  imagen
       if(!imagen){//guardar las imagenes
       return resolve({ok: false ,  messaje  :'imagen no encontrada'})
       }
        //nombre de imagenes
        let imagenesAguardar = [];
        for( const file of files){
        let rptaExtension = validExtension(file.name);
        if(!rptaExtension){
            return reject( { ok : false , error : 'extension no valida'});   
        }   
        let name =  `${uuid()}.${rptaExtension}`;
        imagenesAguardar.push(name);
      }
       //guardar imagenes
       await saveImage(files , pathUpload , imagenesAguardar);  
      //actualizar la imagen
      let ImagenActualizada=  await Imagen.findByIdAndUpdate(imagen._id, {tamaño, imagenes :  imagenesAguardar, importancia}, {new : true})
       .catch(err=>console.log(err));
       if(ImagenActualizada){
            ///ELIMINAR LAS IMAGENES
          elimanarImagenes(imagen.imagenes ,pathUpload)
       }
       resolve({ok: true ,  ImagenActualizada});
     });//end promise
  } 
}

module.exports  = {
     ControlUpload
}
