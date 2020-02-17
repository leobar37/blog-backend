
/*=============================================
=            entorno de trabajo            =
=============================================*/

process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';

/*=============================================
=            google id            =
=============================================*/
process.env.CLIENT_ID = process.env.CLIENT_ID || '792650140448-pr64fgoo3hr96r5lv1798n867pi60kg2.apps.googleusercontent.com';
/*=============================================
=            confiracion de base de datos            =
=============================================*/


let urlDB ;

if(process.env.NODE_ENV === 'dev'){
     urlDB = 'mongodb://localhost:27017/blog'
}else{
    urlDb = process.env.MONGO_URI;
}


/*=============================================
=            seed jwt            =
=============================================*/

process.env.SEED  = "PROYECTOBLOGSEGUROXD";


/*=============================================
=            EXPIRA TOKEN            =
=============================================*/

process.env.expira = '48h';




process.env.urlDB =  urlDB;










