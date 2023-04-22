const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operaciones/Operacion");

function SentenciaIfElseIf(_instruccion, _ambito) {
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito);
    if (operacion.tipo === TIPO_DATO.BOOL) {

        if (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito, "if")
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesIf, nuevoAmbito)
            mensaje += ejec.cadena
            return {
                cadena: mensaje
            }

        }
        //buscando un else if
        for (let i = 0; i < _instruccion.lista_elseif.length; i++) {
            var op = Operacion(_instruccion.lista_elseif[i].expresion, _ambito)
            if (op.tipo === TIPO_DATO.BOOL) {
                if (op.valor) {
                    var nuevoAmbito = new Ambito(_ambito, "else-if")
                    const Bloque = require("./Bloque");
                    var ejec = Bloque(_instruccion.lista_elseif[i].instruccionesElseIf, nuevoAmbito)
                    mensaje += ejec.cadena
                    return {
                        cadena: mensaje
                    }
                }
            }

        }
        if (_instruccion.instruccionesElse != null) {
            const Bloque = require("./Bloque");
            var ejec = Bloque(_instruccion.instruccionesElse, nuevoAmbito)

            mensaje += ejec.cadena
        }
        return {
            cadena: mensaje
        }
    }

}

module.exports = SentenciaIfElseIf