const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const Relacional = require("./Relacional");
const Logica = require("./OpLogica");
const ValorExpresion = require("./ValorExpresion");

function Ternario(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO
        || _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR) {
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.DIVISION
        || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO || _expresion.tipo === TIPO_OPERACION.UNARIA
        || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION) {
        return Aritmetica(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.NOT) {
        return Logica(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE || _expresion.tipo === TIPO_OPERACION.MAYOR
        || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL || _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL) {
        return Relacional(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.TERNARIO) {
        return TernarioOp(_expresion.opIzq, _expresion.opMed, _expresion.opDer, _ambito)
    }
}
function TernarioOp(_opIzq, _opMed, _opDer, _ambito) {
    const opIzq = Ternario(_opIzq, _ambito)

    if(opIzq.tipo == TIPO_DATO.BOOL){
        var resultado = ""
        if(opIzq.valor == true){
            const opMed = Ternario(_opMed, _ambito)
            resultado = opMed;
        }
        else{
            const opDer = Ternario(_opDer, _ambito)
            resultado = opDer
        }
        return {
            valor: resultado.valor,
            tipo: resultado.tipo,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }

}
module.exports = Ternario