const jwt =require('jsonwebtoken');

const authorization =  (req , res, next) =>{
   let token = req.get('token');
   jwt.verify(token , process.env.SEED , (err , code)=>{
      if(err ||  !code){
        return res.status(401).json({ 
            ok : false,
            err
        })
      }     
      req.usuario = code.data;
      next();
   });
}

let verificaRol =  (req, res, next)=> {
     let usuarioReq =  req.usuario ;
    if(usuarioReq.role === "admin"){
         next();
    }else{
         return res.json( {ok :  false  ,meessage : 'acceso denegado'})
    }
     
}


module.exports = {
     authorization ,
     verificaRol
}