const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_VALOR = require("../Enums/TipoValor")


function DecParametro(_instruccion, _ambito) {
    if (_instruccion.tipo_dato === TIPO_DATO.DECIMAL) {

        var valor = 0.0
        if (_instruccion.valor != null) {
            const Operacion = require("../Operaciones/Operacion")
            var op = Operacion(_instruccion.valor, _ambito.anterior)

            tipo = op.tipo;
            if (tipo === TIPO_DATO.DECIMAL) {
                valor = op.valor;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.DECIMAL, _instruccion.linea, _instruccion.columna)

        if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
            _ambito.actualizar(nuevoSimbolo.id, nuevoSimbolo)
            //return "Error: La variable " + nuevoSimbolo.id + " ya existe linea: " + nuevoSimbolo.linea + " columna: " + nuevoSimbolo.columna;
        } else {
            _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            // console.log(_ambito)
            return null
        }
    } else if (_instruccion.tipo_dato === TIPO_DATO.ENTERO) {
        var valor = 0
        if (_instruccion.valor != null) {
            const Operacion = require("../Operaciones/Operacion")
            var op = Operacion(_instruccion.valor, _ambito.anterior)
            tipo = op.tipo;
            if (tipo === TIPO_DATO.ENTERO) {
                valor = op.valor;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.ENTERO, _instruccion.linea, _instruccion.columna)

        if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
            _ambito.actualizar(nuevoSimbolo.id, nuevoSimbolo)
            //return "Error: La variable " + nuevoSimbolo.id + " ya existe linea: " + nuevoSimbolo.linea + " columna: " + nuevoSimbolo.columna;
        } else {
            _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            // console.log(_ambito)
            return null
        }
    } else if (_instruccion.tipo_dato === TIPO_DATO.CHAR) {
        var valor = 0.0
        if (_instruccion.valor != null) {
            const Operacion = require("../Operaciones/Operacion")
            var op = Operacion(_instruccion.valor, _ambito.anterior)
            tipo = op.tipo;
            if (tipo === TIPO_DATO.CHAR) {
                valor = op.valor;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CHAR, _instruccion.linea, _instruccion.columna)

        if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
            _ambito.actualizar(nuevoSimbolo.id, nuevoSimbolo)
            //return "Error: La variable " + nuevoSimbolo.id + " ya existe linea: " + nuevoSimbolo.linea + " columna: " + nuevoSimbolo.columna;
        } else {
            _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            // console.log(_ambito)
            return null
        }
    } else if (_instruccion.tipo_dato === TIPO_DATO.BOOL) {
        var valor = 0.0
        if (_instruccion.valor != null) {
            const Operacion = require("../Operaciones/Operacion")
            var op = Operacion(_instruccion.valor, _ambito.anterior)
            console.log(op)
            tipo = op.tipo;
            if (tipo === TIPO_DATO.BOOL) {
                valor = op.valor;
            }

        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.BOOL, _instruccion.linea, _instruccion.columna)

        if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
            _ambito.actualizar(nuevoSimbolo.id, nuevoSimbolo)
            //return "Error: La variable " + nuevoSimbolo.id + " ya existe linea: " + nuevoSimbolo.linea + " columna: " + nuevoSimbolo.columna;
        } else {

            _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            // console.log(_ambito)
            return null
        }
    } else if (_instruccion.tipo_dato === TIPO_DATO.CADENA) {
        var valor = 0.0
        if (_instruccion.valor != null) {
            const Operacion = require("../Operaciones/Operacion")
            var op = Operacion(_instruccion.valor, _ambito.anterior)
            tipo = op.tipo;
            if (tipo === TIPO_DATO.CADENA) {
                valor = op.valor;
            }

        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)

        if (_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id) != false) {
            _ambito.actualizar(nuevoSimbolo.id, nuevoSimbolo)
            //return "Error: La variable " + nuevoSimbolo.id + " ya existe linea: " + nuevoSimbolo.linea + " columna: " + nuevoSimbolo.columna;
        } else {

            _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
            // console.log(_ambito)
            return null
        }
    } 
}
module.exports = DecParametro