const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");

function incrementoYdecremento(_instruccion, _ambito){
    if(_instruccion.tipo === TIPO_INSTRUCCION.MASMAS){
        if(_ambito.existeSimbolo(_instruccion.id) != true){
            return `Error: El identificador '${_instruccion.id}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }

        var simbolo = _ambito.getSimbolo(_instruccion.id)
        simbolo.valor++;
        _ambito.actualizar(simbolo.id, simbolo)
        return null

    }else if(_instruccion.tipo === TIPO_INSTRUCCION.MENOSMENOS){
        if(_ambito.existeSimbolo(_instruccion.id) != true){
            return `Error: El identificador '${_instruccion.id}' no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }

        var simbolo = _ambito.getSimbolo(_instruccion.id)
        simbolo.valor--;
        _ambito.actualizar(simbolo.id, simbolo)
        return null
    }


}

module.exports = incrementoYdecremento