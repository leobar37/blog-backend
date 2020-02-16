const fs = require('fs');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
 const verify =async function(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  
    });
    const payload = ticket.getPayload();
    let  user = {
        nombre :  payload.name,
        email  : payload.email,
        img : payload.picture,
        google : true
     }
     return user;
  }

 /* --------------helpers upload-------------- */

 //validar extension
const validExtension =   (fileName)=>{
   let particion =  fileName.split('.');
   let extension =  particion[particion.length - 1];
   let permitidos  = ['jpg' , 'gif' , 'png'];
   
   console.log(extension);
   
   if(permitidos.indexOf(extension) < 0){
       return false;
   }else{
       return extension;
   }
    
 };
 //save image server
 const  saveImage =  (sampleFile , path) =>{
    return new Promise( (resolve  , reject)=> {
      sampleFile.mv(path , (err)=>{ 
          if(err)return reject( {  ok  : false ,  error : 'upload image'  , err});
          else {
              resolve( { ok : true ,err : 'upload succefful'});
          }
      });   
 
    });//end promise
 }
 
 ///eliminar imagen 
 const  eliminarImagen  = (ruta)=>{
     if(fs.existsSync(ruta)){
         fs.unlinkSync(ruta);
     }
 }

 /* --------*------ end helpers upload-----*--------- */

  module.exports = {
     verify ,
      validExtension,
      saveImage
  }