
const User =  require('../models/usuario.model');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
//helpers
const  { verify}=require('../lib/helpers');
//google 
const {controlUsuario}  =  require('../classes/usuario.Bd');
const ctlUsuario =  new controlUsuario();

//passport


class ControLogin {
 
/**
 * logueo normal 
  1. buscar su correo  
  2.comparar la contraseña 
  3.hacer el token 
  4. devolver el token
 */    constructor(){}
 
    loguinNormal(data){
     
         return new Promise((resolve , reject)=> {
            let email = data.email;
            let password =  data.password;
            User.findOne( { email :  email },(err , userBd)=>{
                if(err) reject({ok : false  ,err});
                console.log('pasamos de aqui');
                if(!userBd)return reject({ok : false ,message : 'gmail/contraseña incorrectos'});
                if(!bcrypt.compareSync(password , userBd.password))reject({ok : false ,message : 'gmail/contraseña incorrectos'});
                let token = jwt.sign( { data :  userBd} , process.env.SEED ,{expiresIn :process.env.expira});
                console.log('dato devueto');
                resolve( { ok : true , token : token , userBd :userBd});
            });//end Bd
         });//end promise
        
    }
     loguinGoogle(token){
        return new Promise( async (resolve , reject)=>{
            let user  = await verify(token).catch(e => {
                 reject(e)
            })           
            if(!user)return reject({ok : false , message : 'no encontrado'})      
               User.findOne({email : user.email}, (err , userBD)=> {
                 if(err) reject({ ok :  false ,err});
                 if(userBD){
                    if(!userBD.google)reject({ok :false , message : 'este email ya esta regitrado'});
                    else {
                        let token  = jwt.sign({data: userBD} , process.env.SEED , {expiresIn : process.env.expira});
                        resolve({ ok :  true, token  , userBD});
                    }      
                 }else{
                     let data =  {
                        ...user,
                        password : ':)',
                        role : 'editor'
                     }
                     ctlUsuario.agregarUsuario(data).then( resp => {
                        let token  = jwt.sign({data: data} , process.env.SEED , {expiresIn : process.env.expira});
                        resolve({ ok :  true, token  , token , resp });
                       
                     }).catch(err => reject(err));
                 }
             });//end Bd
          
        });//end promise
     }
 
}




module.exports = {
    ControLogin
}
