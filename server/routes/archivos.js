const express=require('express');
const router =  express.Router();
const path = require('path');
const fs=require('fs');
/*=============================================
=            servir imagenes de posts y usuarios            =
=============================================*/

router.get('/uploads/:tipo/:nameImage' , (req , res)=>{
    let fileName =  req.params.nameImage;
    const { tipo } = req.params;
    let imageUrl =  fileName;
     let ruta = '';     
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
    if(fs.existsSync(ruta))
    res.sendFile(ruta);
    else
    {
        ruta = path.resolve(__dirname, `../../uploads/noimage.jpg`);
        res.sendFile(ruta);
    }
    
});





module.exports  = router;