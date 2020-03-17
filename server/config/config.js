
/*=============================================
=            entorno de trabajo            =
=============================================*/

process.env.NODE_ENV =  process.env.NODE_ENV || 'dev';

/*=============================================
=            google id            =
=============================================*/
// process.env.CLIENT_ID = process.env.CLIENT_ID || '792650140448-pr64fgoo3hr96r5lv1798n867pi60kg2.apps.googleusercontent.com';
process.env.CLIENT_ID = process.env.CLIENT_ID || '792650140448-2p45ji7q3durlj89ohdqfkmd17ji560p.apps.googleusercontent.com';
/*=============================================
=            confiracion de base de datos            =
=============================================*/

/*=============================================
=            google secret          =
=============================================*/
process.env.secret  =   process.env.secret ||  'aB9B-ABqiGKJOiZgA3_PSm5I';
let urlDB ;

if(process.env.NODE_ENV === 'dev'){
     urlDB = 'mongodb://localhost:27017/blog2'
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










