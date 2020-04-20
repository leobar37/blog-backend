const {EntradaCont} =require('../classes/entrada');
const Entrada =  require('../models/entrada.model');
let ctrLEntrada =  new EntradaCont();

const  aumentarVisita = (cliente)=>{
  cliente.on('visita' , async (payload , callback)=>{
      console.log(payload.id);
     let rpta = await ctrLEntrada.buscarEntrada(payload.id).catch(err => console.log(err) );
     let entrada =  rpta.entrada;
     if(entrada){
         if(!entrada.visitas) entrada.visitas =  0;
        entrada.visitas =  entrada.visitas + 1;
        entrada = await Entrada.findByIdAndUpdate(payload.id ,  {visitas : entrada.visitas})
        .catch(err =>console.log(entrada));
         console.log(entrada.visitas);
     }
    })
}
module.exports = {
    aumentarVisita
}