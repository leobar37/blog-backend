//Bd  Models
const Usuario =  require('../models/usuario.model');
//constants
const {saltsRounds}  = require('../keys');

//npm dependences
const bcrypt = require('bcrypt');
const jwt =  require('jsonwebtoken');
class controlUsuario {

  /** * agregar un usuario * traer todos los usuarios * dar de baja a a un usuario * buscar un usuario * editar un usario
   */
    constructor(){}
  
    agregarUsuario(data){
        return new Promise( (resolve, reject)=>{
            
            let usuario = new Usuario( {
                nombre:  data.nombre,
                email : data.email ,
             password :  bcrypt.hashSync(data.password, saltsRounds),
                  img : data.img,
                 role :  data.role,
               estado : data.estado,
               google : data.google
            });
            
            usuario.save((err , usuario)=>{ 
                if(err) reject({ok : false , message :'BD error' , err});   
                      
                 if(usuario)  
                  {
                    //generate token
                    let token =  jwt.sign({data :  usuario } , process.env.SEED  , {expiresIn : process.env.expira})
                    resolve({ok : true,  usuario  , token : token})
                  };
            });//end save
        
        });//end promise
    }
 
    getAllUsers(desde, hasta){
      return new Promise( (resolve , reject)=>{
         Usuario.find({})
         .skip(desde).limit(hasta)
         .exec((err , users)=>{
            if(err) reject({ok : false , message :'BD error' , err});      
            else resolve( {ok : true,users }) 
         });//end method Bd

      })//end promise
    }
   updateUser(data, id){
    return  new Promise((resolve , reject)=>{
   
         
       Usuario.findByIdAndUpdate(id ,{
                     nombre:  data.nombre,
                     email : data.email ,
                  password :  bcrypt.hashSync(data.password, saltsRounds),
                       img : data.img,
                      role :  data.role,
                    estado : data.estado,
                    google : data.google
      } , {new :  true} , (err, userUpdate)=>{
        if(err) reject({ok : false , message :'BD error' , err});      
         resolve({ ok : true ,userUpdate })
        
      }); //end method BD
        

    } );//end promise
   }
   getUser(id){
       return  new Promise((resolve, reject)=>{
           Usuario.findById(id ,( err , user)=>{
            if(err) reject({ok : false , message :'BD error' , err});      
            resolve({ok :true , user})
           }); 

       });//end promise
   }
   darbajaUsuario(id){
      return new Promise((resolve, reject)=>{
          Usuario.findByIdAndUpdate(id , { estado : false} ,{ new : true} , 
           (err,  userUpdate)=>{
            if(err) reject({ok : false , message :'BD error' , err});               
             resolve({ok:  true , userUpdate});
           }) //end method Bd
        
      });
   }
}

module.exports  = {
    controlUsuario
}
