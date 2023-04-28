const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaIf(_instruccion, _ambito){
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)

    if(operacion.tipo == TIPO_DATO.BOOL){
        if(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito, "If");
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje += ejec.cadena;
            try{
                if(ejec.break){
                    return{
                        cadena:mensaje,
                        break:true
                    }
                }
            }
            catch(error){
    
            }
            try{
                if(ejec.continue){
                    return{
                        cadena:mensaje,
                        continue:true
                    }
                }
            }
            catch(error){
    
            }
        }
        
        return{
            cadena: mensaje
        }
    }
}

module.exports = SentenciaIf