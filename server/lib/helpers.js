const fs = require('fs');
const SECRET =  'MTs0jz4CKnAbhEnvoWz-mmDL';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID , SECRET, '');
 const verify =async function(token) {
    //  let to  = client.getTokenInfo(token).catch( err =>{
    //        console.log(err);
           
    //  });
    //  console.log('token raro');
    //   console.log(to);
      
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
   let permitidos  = ['jpg' , 'gif' , 'png', 'jpeg'];

   
   if(permitidos.indexOf(extension) < 0){
       return false;
   }else{
       return extension;
   }
    
 };
 //save image server
 //ahora va recibir un arreglo de imagenes
 const  saveImage =  (files , path , names ) =>{
     return new Promise( async (resolve  , reject)=> {
       let cont = 0;
         for (const archivo of  files) {
              archivo.mv(path + names[cont] , (err)=>{      
             }); 
              cont++;
        }
        resolve({ok : true})
    });//end promise
 }

 const  eliminarImagen  =async (ruta)=>{
     if(fs.existsSync(ruta)){
         fs.unlinkSync(ruta);
     }
 }

 const elimanarImagenes = async (names, pathGeneral)=>{
      for(const name  of names){
         let patEliminar =  pathGeneral + name; 
         await eliminarImagen(patEliminar);
      }
 }

 /* --------*------ end helpers upload-----*--------- */

  module.exports = {
     verify ,
      validExtension,
      saveImage ,
      eliminarImagen,
      elimanarImagenes
  }