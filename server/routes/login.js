const express =require('express');
const  router = express.Router();
const { ControLogin} =  require('../classes/login');
const _ =  require('underscore');
const ctrlLoguin =  new ControLogin();

router.post('/login' , (req, res)=>{
    let body  = req.body;    
     body =   _.pick(body , ['password', 'email']);
    ctrlLoguin.loguinNormal(body).then(resp =>res.json(resp))
    .catch(err=> res.json(err)); 
});
router.post('/google'  , (req, res)=>{ 
  let token  =  req.body.idtoken;
  // token =  token.split('.')[1];
  console.log('token');
  
  console.log(token);
    
  if(token)
     ctrlLoguin.loguinGoogle(token).then(resp => res.json(resp) )
     .catch(err => res.json(err));
});

module.exports  =  router;