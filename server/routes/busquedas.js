const app =require('express'); 
const Entrada = require('../models/entrada.model');
const Usuario = require('../models/usuario.model');
const  router =  app.Router();

/*=============================================
=            ruta de busca unitaria            =
=============================================*/
router.get('/collecion/:tabla/:busqueda', async  (req ,res)=> {
 const { tabla ,  busqueda } = req.params;
 let rgx = new RegExp(busqueda , 'i');
switch(tabla){
     case 'usuarios':
     const autores  =  await buscarAutores(rgx);
     res.json ({ok : false, result : autores});
     break; 
     case  'entradas' :
    const entradas =  await buscarEntradas(rgx);
    res.json({ok : true , result: entradas})
     break;
    default : 
     res.json({ok : false , result : 'collecion no especificada'}) 
}
});

/*=============================================
=            ruta de busca total            =
=============================================*/
router.get('/todos/:termino', async (req , res )=> {    
    const { termino } = req.params;
    let resp = [];
  let rgx = new RegExp(termino, 'i');
    const autores  =  await buscarAutores(rgx);
    resp.push(autores);
    const entradas =  await  buscarEntradas(rgx);
    resp.push(entradas);
    console.log(autores);
    
    res.json( { ok : true  , result :  resp});
});

function buscarEntradas(rgx) {
 return new Promise( async ( resolve , reject )=>{   
    const docs  =  await Entrada.find({title : rgx})
          .populate('autor').populate('images');
       resolve(docs);
 })    
}
function buscarAutores(rgx) {
 return new Promise( async ( resolve , reject )=>{   
    const docs  =  await Usuario.find({nombre : rgx })
       .populate('blogs');
       resolve(docs);
 })    
}
module.exports = router;






 