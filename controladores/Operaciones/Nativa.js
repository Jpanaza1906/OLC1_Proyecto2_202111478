const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")

function Nativa(_expresion, _ambito){
    if(_expresion.tipo === TIPO_OPERACION.TOLOWER){
        return optoLower(_expresion.expresion,_ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.TOUPPER){
        return optoUpper(_expresion.expresion,_ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.LENGTH){
        return oplength(_expresion.expresion,_ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.TRUNCATE){
        return optruncate(_expresion.expresion,_ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.ROUND){
        return opround(_expresion.expresion, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.TYPEOF){
        return optypeof(_expresion.expresion, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.TOSTRING){
        return optostring(_expresion.expresion, _ambito)
    }else if(_expresion.tipo === TIPO_OPERACION.TOCHARARRAY){

    }else{
        const Operacion = require("./Operacion")
        return Operacion(_expresion,_ambito)
    }
}
function optoLower(_expresion,_ambito){
    const op = Nativa(_expresion, _ambito)
    if(op.tipo == TIPO_DATO.CADENA){
        const resultado = (op.valor.toString()).toLowerCase()
        return {
            valor:resultado,
            tipo:op.tipo,
            linea: op.linea,
            columna: op.columna
        }
    }
    else{
        return{
            valor: "Error: La variable " +_expresion.valor +" no tiene el tipo correcto en: " +_expresion.linea + " columna: " + _expresion.columna,
            tipo:null,
            linea:_expresion.linea,
            columna:_expresion.columna
        }
    }
}
function optoUpper(_expresion,_ambito){
    const op = Nativa(_expresion, _ambito)
    if(op.tipo == TIPO_DATO.CADENA){
        const resultado = (op.valor.toString()).toUpperCase()
        return {
            valor:resultado,
            tipo:TIPO_DATO.CADENA,
            linea: op.linea,
            columna: op.columna
        }
    }
    else{
        return{
            valor: "Error: La variable " +_expresion.valor +" no tiene el tipo correcto en: " +_expresion.linea + " columna: " + _expresion.columna,
            tipo:null,
            linea:_expresion.linea,
            columna:_expresion.columna
        }
    }
}
function oplength(_expresion,_ambito){
    const op = Nativa(_expresion,_ambito)
    try{
        const resultado = op.valor.length
        return {
            valor:resultado,
            tipo:TIPO_DATO.ENTERO,
            linea: op.linea,
            columna: op.columna
        }
    }catch(error){
        return{
            valor: "Error: La variable " +_expresion.valor +" no tiene el tipo correcto en: " +_expresion.linea + " columna: " + _expresion.columna,
            tipo:null,
            linea:_expresion.linea,
            columna:_expresion.columna
        }
    }
    
}
function optruncate(_expresion,_ambito){
    const op = Nativa(_expresion, _ambito)
    if(op.tipo == TIPO_DATO.DECIMAL){
        const resultado = parseInt(op.valor, 10)
        return {
            valor:resultado,
            tipo:TIPO_DATO.ENTERO,
            linea: op.linea,
            columna: op.columna
        }
    }
    else{
        return{
            valor: "Error: La variable " +_expresion.valor +" no tiene el tipo correcto en: " +_expresion.linea + " columna: " + _expresion.columna,
            tipo:null,
            linea:_expresion.linea,
            columna:_expresion.columna
        }
    }
}
function opround(_expresion,_ambito){
    const op = Nativa(_expresion,_ambito)
    if(op.tipo == TIPO_DATO.DECIMAL){
        const resultado = Math.round(op.valor)
        return {
            valor:resultado,
            tipo:op.tipo,
            linea: op.linea,
            columna: op.columna
        }
    }
    else{
        return{
            valor: "Error: La variable " +_expresion.valor +" no tiene el tipo correcto en: " +_expresion.linea + " columna: " + _expresion.columna,
            tipo:null,
            linea:_expresion.linea,
            columna:_expresion.columna
        }
    }
}
function optypeof(_expresion,_ambito){
    const op = Nativa(_expresion, _ambito)
    try{
        return{
            valor: op.tipo,
            tipo: TIPO_DATO.CADENA,
            linea: op.linea,
            columna: op.columna
        }
    }
    catch(error){
        return{
            valor: "Error: La variable " +_expresion.valor +" no tiene el tipo correcto en: " +_expresion.linea + " columna: " + _expresion.columna,
            tipo:null,
            linea:_expresion.linea,
            columna:_expresion.columna
        }
    }
}
function optostring(_expresion,_ambito){
    try{
        const op = Nativa(_expresion,_ambito)
        const resultado = op.valor.toString()
        return{
            valor: resultado,
            tipo: TIPO_DATO.CADENA,
            linea: op.linea,
            columna: op.columna
        }
    }
    catch(error){
        return{
            valor: "Error: La variable " +_expresion.valor +" no tiene el tipo correcto en: " +_expresion.linea + " columna: " + _expresion.columna,
            tipo:null,
            linea:_expresion.linea,
            columna:_expresion.columna
        }
    }
}
module.exports = Nativa