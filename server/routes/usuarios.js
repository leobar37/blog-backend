const  _ = require('underscore');
const express= require('express');
const {controlUsuario} = require('../classes/usuario.Bd');
const  {authorization ,verificaRol }  = require('../middlewares/middlewar')
const router = express.Router();
 //control
 let userControl = new controlUsuario();

  /** * agregar un usuario 
   * * traer todos los usuarios 
   * * dar de baja a a un usuario 
   * * buscar un usuario * editar un usuario*/
  //
//crear usuario
router.post('/usuario' , (req ,res) =>{
  let body =  req.body;
   body = _.pick(body ,[ 'nombre','email' ,'password' ,'img' ,'role' , 'estado' ,'google' ] );
   userControl.agregarUsuario(body)
   .then(resp => res.json(resp))
   .catch(err => res.json(err));
});
//traer un usurio
router.get('/usuario/:id', [authorization , verificaRol], (req ,res) =>{
 let id  = req.params.id;
  userControl.getUser(id)
  .then(resp => res.json(resp))
  .catch(err => res.json(err));
});
//todos los uuarios
router.get('/usuario' , [ authorization , verificaRol] ,(req ,res) =>{
    let hasta =  Number(req.query.hasta);
    let desde =  Number(req.query.desde);
    userControl.getAllUsers(desde, hasta)
    .then(resp => res.json(resp))
    .catch(err => res.json(err));

});
//actulizar un usuario
router.put('/usuario/:id', [authorization] ,  (req ,res) =>{
    let id  = req.params.id;
    let body =  req.body;
    body = _.pick(body ,[ 'nombre','email' ,'password' ,'img' ,'role' , 'estado' ,'google' ] );
    userControl.updateUser(body , id)
    .then(resp => res.json( resp))
    .catch(err => res.json(err));
});
//dar de baja usuario
router.put('/usuario/baja/:id'  ,[authorization ,verificaRol] , (req ,res) =>{
    let id = req.params.id;   
    userControl.darbajaUsuario(id)
    .then(resp => res.json(resp))
    .catch(err => res.json(err));
});



module.exports  = router;