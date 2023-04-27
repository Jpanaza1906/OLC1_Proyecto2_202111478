const Funcion = require("../Ambito/Funcion")

function DecFuncion(_instruccion,_ambito){
    const nuevaFuncion = new Funcion(_instruccion.tipof,_instruccion.nombre, _instruccion.lista_parametros,_instruccion.instrucciones,_instruccion.rexpresion,_instruccion.linea,_instruccion.columna)
    if(_ambito.existeSimbolo(nuevaFuncion.id)!=false){ 
        return `Error: No se puede declarar un metodo con el mismo nombres de una variable '${nuevaFuncion.id}'... Linea: ${nuevaFuncion.linea} Columna: ${nuevaFuncion.columna}`
    
    }else if(_ambito.existeMetodo(nuevaFuncion.id)!=false){
        return `Error: El método '${nuevaFuncion.id}' ya existe... Linea: ${nuevaFuncion.linea} Columna: ${nuevaFuncion.columna}`
    }

    _ambito.addMetodo(nuevaFuncion.id,nuevaFuncion)
    return null
}

module.exports = DecFuncion