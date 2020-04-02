const {  ControlCategoria} =require('../classes/categoria');
const  { Router}=require('express');
const router =  Router();
let ctrlCategoria = new ControlCategoria();

router.post('/categoria' , ( req, res )=>{
   let body = req.body;
 ctrlCategoria.crearCategoria(body).then(resp => res.json(resp))
  .catch(err => res.json(err));
});

router.put('/categoria/:id' , ( req, res )=>{
    let body = req.body;
   const { id }  = req.params;
  ctrlCategoria.actualizarCategoria( body , id).then(resp => res.json(resp))
   .catch(err => res.json(err));
 });
 router.get('/categoria/:id' , ( req, res )=>{
   const { id }  = req.params;
  ctrlCategoria.listarCategoria(id).then(resp => res.json(resp))
   .catch(err => res.json(err));
 });
 router.delete('/categoria/:id' , ( req, res )=>{
    const { id }  = req.params;
   ctrlCategoria.eliminarCategoria(id).then(resp => res.json(resp))
    .catch(err => res.json(err));
  });
  router.get('/categoria' , ( req, res )=>{
   ctrlCategoria.listarCategorias().then(resp => res.json(resp))
    .catch(err => res.json(err));
  });

  module.exports = router;