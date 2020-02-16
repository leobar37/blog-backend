
const fileUpload = require('express-fileupload');
const {validExtension, saveImage}  = require('../lib/helpers');
const  Entrada =  require('../models/entrada.model');
const   _= require('underscore');
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
        let pathUpload =  'uploads/';
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
     //guardar la  imagen
     await saveImage(file , pathUpload).catch (err =>{
          reject( { ok : false , err});
     });
     imagesAux.push(pathUpload);
     let updatePost =await Entrada.findByIdAndUpdate(idPost , { images : imagesAux } );
     if(updatePost){       
             resolve( { ok   : true  , messaje : 'agregado correctamente' , path  : name});
     }
 }); //end promise
        
  }//end function
     
}



module.exports  = {
     ControlUpload
}
