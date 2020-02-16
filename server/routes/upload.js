const express =require('express');
const  router = express.Router();

const _ =  require('underscore');
const  { ControlUpload} = require('../classes/upload');


//instance control
let ctrLUpload =  new ControlUpload(router);

router.post('/upload/post/:id', (req , res)=>{
   let idPost =  req.params.id;
    if(!req.files || Object.keys(req.files).length ===0 ){
        return res.json( {
             ok :  false ,   err : 'no se enviaron imagenes'
        })
    }
    let file = req.files.img;
    console.log(file.name);
    
    ctrLUpload.uploadImageBlog(idPost ,file)
    .then( resp =>res.json(resp))
    .catch(err  => res.json(err));
});

module.exports   =  router;