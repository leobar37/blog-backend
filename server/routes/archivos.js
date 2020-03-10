const express=require('express');
const router =  express.Router();
const path = require('path');


/*=============================================
=            servir imagenes de posts y usuarios            =
=============================================*/

router.get('/uploads/:tipo/:nameImage' , (req , res)=>{
    let fileName =  req.params.nameImage;
    const { tipo } = req.params;
    let imageUrl =  fileName;
     let ruta = path.resolve(__dirname, `../../uploads/${imageUrl}`);     
    switch(tipo){
        case 'usuarios':
            ruta = path.resolve(__dirname, `../../uploads/${tipo}/${imageUrl}`);  
            break;
        case 'posts' : 
            ruta = path.resolve(__dirname, `../../uploads/${tipo}/${imageUrl}`);
            break;  
        default : 
           ruta = path.resolve(__dirname, `../../uploads/noimage.jpg`); 
           break;
    }
    res.sendFile(ruta);
});





module.exports  = router;