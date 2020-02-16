const {EntradaCont}  = require('../classes/entrada');
const  express  = require('express');
const router =  express.Router();
const _ =  require('underscore');
//middlewares
const {authorization}  =require('../middlewares/middlewar');
const controlEntrada =  new EntradaCont();

//crear entradas
router.post('/entrada', [authorization],(req , res)=> {
   let body = req.body;

   body = _.pick(body,['titulo' , 'images' ,'body' ,'extracto','autor','keywords']);
     controlEntrada.crearEntrada(body)
     .then(res => res.json(res))
     .catch(err => res.json(err));
});
//listar entradas
router.get('/entrada/listar' , ( req  , res)=>{
     let desde = Number(req.query.desde);
     let hasta  =  Number(req.query.hasta);
     controlEntrada.listarEntradas(desde,hasta).then(entradas => res.json(entradas))
     .catch(err => res.json(err));
});
//listat entrdas por termino 
router.get('/entrada/listar/:termino' , ( req  , res)=>{
  let desde = Number(req.query.desde);
  let hasta  =  Number(req.query.hasta);
  let termin =  req.params.termino;
  controlEntrada.listarEntradasxTermino(desde,hasta ,termin).then(entradas => res.json(entradas))
  .catch(err => res.json(err));
});
//editar una entrada
router.put('/entrada/:id',[authorization] ,(req , res)=>{
 let id = req.params.id;
 let body = req.body;
 body = _.pick(body,['titulo' , 'images' ,'body' ,'extracto','autor','keywords']);
 controlEntrada.actualizarEntrada(id , body).then(resp => res.json(resp))
 .catch(err=> res.json(err));
});
//retornar una entrada
router.get('/entrada/:id' , (req , res)=>{ 
  let id =  req.params.id;
  controlEntrada.buscarEntrada(id).then(entrada => res.json(entrada))
  .catch(err=> res.json(err)); 
});


module.exports =  router;


