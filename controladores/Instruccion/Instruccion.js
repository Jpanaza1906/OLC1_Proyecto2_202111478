const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");

function nuevaOperacion(_opizq,_opDer,_tipo, _linea, _columna){
    return{
        opIzq:_opizq,
        opDer:_opDer,
        tipo:_tipo,
        linea:_linea,
        columna:_columna,
    }
}

function nuevaUnaria(_opDer,_tipo, _linea, _columna){
    return{
        opDer:_opDer,
        tipo:_tipo,
        linea:_linea,
        columna:_columna,
    }
}

const Instruccion ={
    nuevoPrint: function (_expresion,_linea,_columna) {
        return {
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }

    },nuevoValor: function (_valor, _tipo, _linea, _columna) {
        return {
            tipo: _tipo,
            valor: _valor,
            linea: _linea,
            columna: _columna
        }

    },nuevaOperacionBinaria: function (_opizq,_opDer,_tipo, _linea, _columna) {
        return nuevaOperacion(_opizq,_opDer,_tipo, _linea, _columna);
    },nuevaOperacionUnaria: function (_opDer,_tipo, _linea, _columna) {
        return nuevaUnaria(_opDer,_tipo, _linea, _columna);
    },nuevaAsignacion: function (_id, _expresion, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }

    },nuevaDeclaracion: function (_id, _valor,_tipo, _linea, _columna) { 
        return{

            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }

    },nuevoMain: function (_nombre,_lista_valores, _linea, _columna) {
        return{
            tipo: TIPO_INSTRUCCION.MAIN,
            nombre: _nombre,
            lista_valores:_lista_valores,
            linea: _linea,
            columna: _columna
        }

    },nuevoMetodo: function (_nombre, _lista_parametros, _instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.DEC_METODO,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },nuevoIf: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }
}
module.exports = Instruccion;