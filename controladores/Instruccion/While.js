const Ambito = require("../Ambito/Ambito");
const Operacion = require("../Operaciones/Operacion");
const TIPO_DATO = require("../Enums/TipoDato");

function SentenciaWhile(_instruccion, _ambito){
    var mensaje = "";
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo == TIPO_DATO.BOOL){
        while(operacion.valor){
            //Definir el nuevo ambito
            var nuevoAmbito = new Ambito(_ambito, "WHILE")
            const Bloque = require("./Bloque")
            //Realizar las intrucciones
            var eje = Bloque(_instruccion.instrucciones,nuevoAmbito)
            mensaje += eje.cadena     
            try{
                if(eje.break){
                    return{
                        cadena:mensaje
                    }
                }
            }
            catch(error){
    
            }
            //refrescar el valor de la condicion
            operacion = Operacion(_instruccion.expresion,_ambito)            
            try{
                if(eje.continue){
                    continue;
                }
            }
            catch(error){
    
            }
        }
        return{
            cadena:mensaje
        }
    }
}

module.exports = SentenciaWhile