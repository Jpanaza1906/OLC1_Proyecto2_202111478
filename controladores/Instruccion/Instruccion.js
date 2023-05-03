const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
function nuevaOpTernario(_opIzq, _opMed, _opDer, _tipo, _linea,_columna){
    return{
        opIzq:_opIzq,
        opMed:_opMed,
        opDer:_opDer,
        tipo:_tipo,
        linea:_linea,
        columna:_columna,
    }
}
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
    },nuevoTernario: function(_opIzq, _opMed, _opDer, _tipo, _linea, _columna){
        return nuevaOpTernario(_opIzq,_opMed,_opDer,_tipo,_linea,_columna);
    },nuevoIncremento: function(_id, _instrucciones, _expresion, _linea, _columna){
        return {    // identificador++
            tipo: TIPO_INSTRUCCION.MASMAS,  // ++
            id: _id.toLowerCase(),          // identificador
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }

    },nuevoDecremento: function(_id, _instrucciones, _expresion, _linea, _columna){
        return {    // identificador++
            tipo: TIPO_INSTRUCCION.MENOSMENOS,  // --
            id: _id.toLowerCase(),          // identificador
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    }, nuevoCasteo: function(_tipoC, _expresion, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.CASTEO,
            tipoC : _tipoC,
            expresion  : _expresion,
            linea : _linea,
            columna : _columna
        }
    },nuevoIfElse: function (_expresion, _instruccionesIf, _instruccionesElse, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.IFCE,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna
        }
    },nuevoElseIf: function (_expresion, _instruccionesElseIf, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.ELSEIF,
            expresion: _expresion,
            instruccionesElseIf: _instruccionesElseIf,
            linea: _linea,
            columna: _columna
        }
    },nuevoIfConElseIf: function (_expresion, _instruccionesIf, _lista_elseif, _instruccionesElse, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.IFCEIF,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            lista_elseif: _lista_elseif,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna

        }
    },nuevoLista: function(_id, _tipo_lista, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.LIST,
            id_lista: _id,
            valor: null,
            tipo_lista: _tipo_lista,
            linea: _linea,
            columna: _columna

        }
    },nuevoFor: function(_declaracion, _condiciones, _actualizacion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.FOR,
            declaracion: _declaracion,
            condiciones: _condiciones,
            actualizacion: _actualizacion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },nuevoSwitch: function(_id, _cases, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.SWITCHCASE,
            id: _id,
            cases: _cases,
            linea: _linea,
            columna: _columna
        }
    },nuevoCase: function(_expresion, _instrucciones, _linea, _columna){
        return {
            expresion : _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },nuevoWhile: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },nuevoDoWhile: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo:TIPO_INSTRUCCION.DOWHILE,
            expresion:_expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },nuevoEjecMetodo: function (_nombre, _lista_valores, _linea, _columna) {
        return{
            tipo: TIPO_INSTRUCCION.EJE_METODO,
            nombre: _nombre,
            lista_valores:_lista_valores,
            linea: _linea,
            columna: _columna
        }
    },nuevaFuncion: function(_tipof, _nombre, _lista_parametros, _instrucciones, _rexpresion ,_linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DEC_FUNCION,
            tipof: _tipof,
            nombre: _nombre,
            lista_parametros : _lista_parametros,
            instrucciones: _instrucciones,
            rexpresion: _rexpresion,
            linea: _linea,
            columna: _columna
        }
    },nuevaEjecFuncion: function(_nombre, _lista_valores, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.EJE_FUNCION,
            nombre: _nombre,
            lista_valores:_lista_valores,
            linea: _linea,
            columna: _columna
        }
    },nuevoReturn: function(_expresion, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.RETURN,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },nuevaNativa: function(_tipo, _expresion, _linea, _columna){
        return{
            tipo: _tipo,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },nuevoBreak: function(_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.BREAK,
            linea: _linea,
            columna: _columna
        }
    },nuevoContinue: function(_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.CONTINUE,
            linea: _linea,
            columna: _columna
        }
    },nuevoVectorVacio: function (_tipo, _id, _tipoCreado, _tamanio, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.VEC_VACIO,
            tipoVec: _tipo,
            id: _id,
            tipoCreadoVec: _tipoCreado,
            tamanio: _tamanio,
            linea: _linea,
            columna: _columna
        }
    },nuevoVectorValores: function (_tipo, _id, _listaValores, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.VEC_VALORES,
            tipoVec: _tipo,
            id: _id,
            listaValores: _listaValores,
            linea: _linea,
            columna: _columna
        }
    },nuevoAccesoVec: function(_id, _indice, _linea, _columna ){
        return{
            tipo_dato: TIPO_INSTRUCCION.ACCESO_VECTORES,
            id:_id,
            indice:_indice,
            linea: _linea,
            columna: _columna
        }
    },modVectores: function(_id, _posicion,_valor,_linea,_columna){
        return{
            tipo: TIPO_INSTRUCCION.MOD_VECTORES,
            id:_id,
            posicion:_posicion,
            valor:_valor,
            linea: _linea,
            columna: _columna
        }
    },nuevoAddList: function(_id, _expresion, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.ADD_LIST,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },nuevoAccesoList: function(_id, _indice, _linea, _columna ){
        return{
            tipo_dato: TIPO_INSTRUCCION.ACCESO_LIST,
            id:_id,
            indice:_indice,
            linea: _linea,
            columna: _columna
        }
    },
}
module.exports = Instruccion;