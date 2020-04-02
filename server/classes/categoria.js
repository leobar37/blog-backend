const Categoria  = require('../models/categoria');
const Entrada = require('../models/entrada.model');



class  ControlCategoria {
    
    constructor(){
    }

    crearCategoria( data){
      return new Promise( async (resolve , reject )=>{
        const { nombre , tags , date, descripcion } = data;
        let categoria  = new Categoria( {
            nombre , tags , date, descripcion
        })
        let cat = await categoria.save().catch (err =>{
            reject( {ok: false , err});
        });
         resolve( { ok : true ,  cat});
      }) 
    }
    
    actualizarCategoria( data , idCategoria){
        return new Promise( async (resolve , reject )=>{
          const { nombre , tags , date  , descripcion} = data;
          const categoria = {
              nombre , tags  , date, descripcion
          }
          let cat = await Categoria.findByIdAndUpdate(idCategoria , categoria , { new : true}).catch (err =>{
              reject( {ok: false , err});
          });
          if(cat){
            let docs =  await Categoria.find( {});
             resolve({ ok : false , docs}) 
            }
         
        }) 
      }  
     eliminarCategoria(idCategoria) {
         return new Promise( async (resolve, reject )=>{
           let res = await  Entrada.deleteOne( {categoria : idCategoria});
            const cat=  await  Categoria.findByIdAndDelete(idCategoria).catch( err => reject({  ok: false , err}));
             const docs = await Categoria.find({});
            resolve( { ok: true , docs , res});
         });
     }
    listarCategorias(){
       return new Promise( async ( resolve , reject )=>{
        const docs = await  Categoria.find( {}).catch(  err => reject( { ok : false   , err}));
        resolve({ ok  :  true , docs});
       });
    }
    listarCategoria(id){
        return new Promise( async  ( resolve , reject)=>{
         const doc = await Categoria.findById(id).catch( err =>{
              reject( { ok : false , err  });
         });
          resolve({ ok : false , doc}) 
        });
    }

}
module.exports = {
    ControlCategoria  
}
