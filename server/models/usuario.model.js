const mongoose  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema =  mongoose.Schema;
// const bcrypt =  require('bcrypt');
// const {saltsRounds}  = require('../keys')
let  usuarioSchema =  new Schema( {
    // id: { type : mongoose.Types.ObjectId},
    nombre : {type : String ,  required : [true , 'es necesario el nombre']},
    email  : {type : String ,  unique : true  , required : [true , 'el email es necesario']},
    password : {type  :  String },
    redes : [String],
    img  : {type : String},
    role : { type : String , enum : { 
        values : [ 'admin' , 'editor' ],
    }},
    blogs : [{ type : Schema.Types.ObjectId ,  ref : 'Entrada'}] ,
    estado : {type :  Boolean , default : true} ,
    google: {type : Boolean ,  default :  false}
    
});
usuarioSchema.plugin(uniqueValidator, {message : '{PATH} exists '});

//anular la contraseña al traer un usuario
// usuarioSchema.methods.generateHash = function (password) { 
//      return bcrypt.hashSync(password , saltsRounds , null);
// }
// //comparar contraseñas
// usuarioSchema.methods.validatePassword = function (password) {
//      return  bcrypt.compareSync(password , this.local.password);
//   }
//borrar la contraseña al servir un usuario
usuarioSchema.methods.toJSON = function() {
     let user  = this ;
     let userOb  = user.toObject();
     delete userOb.password ;
     return userOb;
}



module.exports = mongoose.model('Usuario' , usuarioSchema);