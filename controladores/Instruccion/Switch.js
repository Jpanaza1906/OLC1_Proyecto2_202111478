const Ambito = require("../Ambito/Ambito");
const Operacion = require("../Operaciones/Operacion");

function SwitchCase(_instruccion, _ambito){
    var mensaje = ""
    var variable = Operacion(_instruccion.id, _ambito)
    const cases = _instruccion.cases
    for(const ncase of cases){
        if(variable.valor == ncase.expresion.valor){
            var nuevoAmbito = new Ambito(_ambito, "SWITCH")
            const Bloque = require("./Bloque")
            var eje = Bloque(ncase.instrucciones, nuevoAmbito)
            mensaje += eje.cadena
            break;
        }
        else if(ncase.expresion.valor == "default"){
            var nuevoAmbito = new Ambito(_ambito, "SWITCH")
            const Bloque = require("./Bloque")
            var eje = Bloque(ncase.instrucciones, nuevoAmbito)
            mensaje += eje.cadena
            break;
        }
    }    
    return{
        cadena:mensaje
    }
}

module.exports = SwitchCase