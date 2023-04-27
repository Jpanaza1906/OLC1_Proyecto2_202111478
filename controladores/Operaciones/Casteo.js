const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const Relacional = require("./Relacional");
const Logica = require("./OpLogica");
const ValorExpresion = require("./ValorExpresion");

function Casteo(_expresion, _ambito){    
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
    //      CASTEO
    else if(_expresion.tipo === TIPO_INSTRUCCION.CASTEO){
        return CasteoOp(_expresion.tipoC, _expresion.expresion, _ambito)
    }
    else{
        const Operacion = require("./Operacion")
        return Operacion(_expresion,_ambito)
    }
}
function CasteoOp(_tipoC, _expresion, _ambito){
    const op = Casteo(_expresion, _ambito)
    var resultado = op.valor
    if(_tipoC == TIPO_DATO.ENTERO){
        if(op.tipo == TIPO_DATO.DECIMAL){
            resultado = parseInt(op.valor, 10)
        }else if(op.tipo == TIPO_DATO.CADENA){
            resultado = parseInt(op.valor)
        }else if(op.tipo == TIPO_DATO.CHAR){
            resultado = (op.valor).charCodeAt(0)
        }else if(op.tipo == TIPO_DATO.BOOL){
            resultado = 0;
            if(op.valor){
                resultado = 1;
            }
        }
    }else if(_tipoC == TIPO_DATO.DECIMAL){
        if(op.tipo == TIPO_DATO.ENTERO){
            resultado = (op.valor).toFixed(2)
        }else if(op.tipo == TIPO_DATO.CADENA){
            resultado = parseFloat(op.valor)
        }
    }else if(_tipoC == TIPO_DATO.CHAR){
        if(op.tipo == TIPO_DATO.ENTERO){
            resultado = String.fromCharCode(op.valor)        
        }else if(op.tipo == TIPO_DATO.DECIMAL){
            let numentero = Math.round(op.valor)
            resultado = String.fromCharCode(numentero)
        }
    }
    return {
        valor: resultado,
        tipo: _tipoC,
        linea: _expresion.linea,
        columna: _expresion.columna
    }

}
module.exports = Casteo