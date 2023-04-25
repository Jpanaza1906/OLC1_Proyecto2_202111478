const Ambito = require("../Ambito/Ambito");
const Operacion = require("../Operaciones/Operacion");
const TIPO_DATO = require("../Enums/TipoDato");

function SentenciaDoWhile(_instruccion, _ambito){
    var mensaje = "";
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo == TIPO_DATO.BOOL){
        while((operacion = Operacion(_instruccion.expresion, _ambito).valor)){
            //Definir el nuevo ambito
            var nuevoAmbito = new Ambito(_ambito, "DOWHILE")
            const Bloque = require("./Bloque")
            //Realizar las intrucciones
            var eje = Bloque(_instruccion.instrucciones,nuevoAmbito)
            mensaje += eje.cadena     
            //refrescar el valor de la condicion
            operacion = Operacion(_instruccion.expresion,_ambito)
        }
        return{
            cadena:mensaje
        }
    }
}

module.exports = SentenciaDoWhile