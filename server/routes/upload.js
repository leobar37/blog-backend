const express =require('express');
const  router = express.Router();


const _ =  require('underscore');
const  { ControlUpload} = require('../classes/upload');



// module.exports = multer({ storage});
//instance control
let ctrLUpload =  new ControlUpload(router);

///subir iamgenes de post

router.post('/upload/post/:id' , (req , res)=>{
   let idPost =  req.params.id;
    if(!req.files || Object.keys(req.files).length ===0 ){
        return res.json( {
             ok :  false ,   err : 'no se enviaron imagenes'
        })
    }
    let file = req.files.image;
    ctrLUpload.uploadImageBlog(idPost ,file)
    .then( resp =>res.json(resp))
    .catch(err  => res.json(err));
});
router.post('/upload/usuario/:id' , (req , res)=>{
   let idUs =  req.params.id;
    if(!req.files || Object.keys(req.files).length ===0 ){
        return res.json( {
             ok :  false ,   err : 'no se enviaron imagenes'
        })
    }
    let file = req.files.image;
    
     ctrLUpload.uploadImageUsuario(idUs , file)
    .then( resp =>res.json(resp))
    .catch(err  => res.json(err));
});

//return images post

module.exports   =  router;