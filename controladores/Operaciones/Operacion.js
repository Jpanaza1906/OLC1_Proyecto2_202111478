const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica.js");
const Logica = require("./OpLogica");
const Relacional = require("./Relacional");
const Ternario = require("./Ternario");
const ValorExpresion = require("./ValorExpresion");
const Casteo = require("./Casteo");
const FuncionOp = require("./EjeFuncion");
const Nativa = require("./Nativa")

function Operacion(_expresion,_ambito){
    if(_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR){
            return ValorExpresion(_expresion,_ambito);
    }
    //      OPERACIONES ARITMETICAS
    else if(_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION ||
        _expresion.tipo === TIPO_OPERACION.DIVISION || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO || 
        _expresion.tipo === TIPO_OPERACION.UNARIA){
        return Aritmetica(_expresion,_ambito);
    }
    //      OPERACIONES RELACIONALES
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MAYOR||_expresion.tipo === TIPO_OPERACION.MAYORIGUAL
        ||_expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return Relacional(_expresion, _ambito)
    }
    //      OPERACIONES LOGICAS
    else if(_expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.NOT){
        return Logica(_expresion, _ambito)
    }
    //      OPERADOR TERNARIO
    else if(_expresion.tipo === TIPO_OPERACION.TERNARIO){        
        return Ternario(_expresion, _ambito)
    }
    //      CASTEO
    else if(_expresion.tipo === TIPO_INSTRUCCION.CASTEO){
        return Casteo(_expresion, _ambito)
    }
    //  EJECUTAR FUNCION
    else if(_expresion.tipo === TIPO_INSTRUCCION.EJE_FUNCION){        
        return FuncionOp(_expresion,_ambito)
    }
    //    OPERACIONES NATIVAS
    else if(_expresion.tipo === TIPO_OPERACION.TOLOWER || _expresion.tipo === TIPO_OPERACION.TOUPPER || _expresion.tipo === TIPO_OPERACION.LENGTH ||
        _expresion.tipo === TIPO_OPERACION.TRUNCATE || _expresion.tipo === TIPO_OPERACION.ROUND || _expresion.tipo === TIPO_OPERACION.TYPEOF ||
        _expresion.tipo === TIPO_OPERACION.TOSTRING || _expresion.tipo === TIPO_OPERACION.TOCHARARRAY){
        return Nativa(_expresion, _ambito)
    }
}
module.exports = Operacion;  