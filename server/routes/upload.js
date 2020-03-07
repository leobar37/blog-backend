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
//   const { tamaño , imagenes, importancia } = req.body;
let body = req.body;
    if(!req.files || Object.keys(req.files).length ===0 ){
        return res.json( {
             ok :  false ,   err : 'no se enviaron imagenes'
        })
    }
    // console.log(req.files);
    let archivos = req.files.imagenes;
    // let file = req.files.imagenes;
    ctrLUpload.uploadImageBlog(idPost ,archivos, body )
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

router.put('/upload/imgs/:id' ,  (req , res)=>{
     const { id } =  req.params;
    let files =req.files.imagenes;
     ctrLUpload.editarImagenes(id,  files, req.body )
     .then( resp => res.json( { ok : true,  resp}))
     .catch(err => {ok: false , err});

})
//return images post

module.exports   =  router;