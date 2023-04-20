const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const Logica = require("./OpLogica");
const ValorExpresion = require("./ValorExpresion");

function Relacional(_expresion,_ambito){
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO 
        || _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.DIVISION 
        || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO || _expresion.tipo === TIPO_OPERACION.UNARIA 
        || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return Aritmetica(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.NOT){
        return Logica(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL) {
        return igualigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.DIFERENTE){
        return diferente(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.MENOR){
        return menor(_expresion.opIzq, _expresion.opDer,_ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return menorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.MAYOR){
        return mayor(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return mayorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}

function igualigual(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)

    // console.log(opIzq.tipo,opDer.tipo)
    if ((opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) 
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.BOOL && opDer.tipo == TIPO_DATO.BOOL)
        || ((opIzq.valor == 1 || opIzq.valor == 0) && opDer.tipo == TIPO_DATO.BOOL) || (opIzq.tipo == TIPO_DATO.BOOL && (opDer.valor == 1 || opDer.valor == 0))) {
        var resultado = false
        //evaluar casos como: 0 == false, 0 == true, 1 == false, 1 == true
        if(((opIzq.valor == 1 || opIzq.valor == 0) && opDer.tipo == TIPO_DATO.BOOL) || (opIzq.tipo == TIPO_DATO.BOOL && (opDer.valor == 1 || opDer.valor == 0))){
            if (opIzq.valor == 0) {opIzq.valor = false}
            else if(opIzq.valor == 1) {opIzq.valor = true}
            else if(opDer.valor == 0) {opDer.valor = false}
            else if(opDer.valor == 1) {opDer.valor = true}
        }
        //evaluar casos como: caracteres comparados con numeros
        if(opIzq.tipo == TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt()
        }
        if(opDer.tipo == TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt()
        }
        //evaluar si son iguales
        if (opIzq.valor == opDer.valor) { resultado = true }

        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}
function diferente(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)

    // console.log(opIzq.tipo,opDer.tipo)
    if ((opIzq.tipo == TIPO_DATO.CADENA && opDer.tipo == TIPO_DATO.CADENA) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) 
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.BOOL && opDer.tipo == TIPO_DATO.BOOL)
        || ((opIzq.valor == 1 || opIzq.valor == 0) && opDer.tipo == TIPO_DATO.BOOL) || (opIzq.tipo == TIPO_DATO.BOOL && (opDer.valor == 1 || opDer.valor == 0))) {
        var resultado = false
        //evaluar casos como: 0 != false, 0 != true, 1 != false, 1 != true
        if(((opIzq.valor == 1 || opIzq.valor == 0) && opDer.tipo == TIPO_DATO.BOOL) || (opIzq.tipo == TIPO_DATO.BOOL && (opDer.valor == 1 || opDer.valor == 0))){
            if (opIzq.valor == 0) {opIzq.valor = false}
            else if(opIzq.valor == 1) {opIzq.valor = true}
            else if(opDer.valor == 0) {opDer.valor = false}
            else if(opDer.valor == 1) {opDer.valor = true}
        }
        //evaluar casos como: caracteres comparados con numeros
        if(opIzq.tipo == TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt()
        }
        if(opDer.tipo == TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt()
        }
        //evaluar si son diferentes
        if (opIzq.valor != opDer.valor) { resultado = true }

        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}
function menor(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)

    // console.log(opIzq.tipo,opDer.tipo)
    if ((opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) 
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)){
        var resultado = false        
        //evaluar los caracteres en su codigo ascii
        if(opIzq.tipo == TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt()
        }
        if(opDer.tipo == TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt()
        }
        //evaluar si son diferentes
        if (opIzq.valor < opDer.valor) { resultado = true }

        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}
function menorigual(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)

    // console.log(opIzq.tipo,opDer.tipo)
    if ((opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) 
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)){
        var resultado = false        
        //evaluar los caracteres en su codigo ascii
        if(opIzq.tipo == TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt()
        }
        if(opDer.tipo == TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt()
        }
        //evaluar si son diferentes
        if (opIzq.valor <= opDer.valor) { resultado = true }

        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}
function mayor(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)

     //console.log(opIzq.tipo,opDer.tipo)
    if ((opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) 
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)){
        var resultado = false        
        //evaluar los caracteres en su codigo ascii
        if(opIzq.tipo == TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt()
        }
        if(opDer.tipo == TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt()
        }
        //evaluar si son diferentes
        if (opIzq.valor > opDer.valor) { resultado = true }

        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}
function mayorigual(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)

    // console.log(opIzq.tipo,opDer.tipo)
    if ((opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.ENTERO)
        || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.ENTERO && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.ENTERO) || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.CHAR) 
        || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.DECIMAL) || (opIzq.tipo == TIPO_DATO.CHAR && opDer.tipo == TIPO_DATO.CHAR)
        || (opIzq.tipo == TIPO_DATO.DECIMAL && opDer.tipo == TIPO_DATO.DECIMAL)){
        var resultado = false        
        //evaluar los caracteres en su codigo ascii
        if(opIzq.tipo == TIPO_DATO.CHAR){
            opIzq.valor = opIzq.valor.charCodeAt()
        }
        if(opDer.tipo == TIPO_DATO.CHAR){
            opDer.valor = opDer.valor.charCodeAt()
        }
        //evaluar si son diferentes
        if (opIzq.valor >= opDer.valor) { resultado = true }

        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}
function ternario(_opIzq,_opMed,_opDer,_ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opMed = Relacional(_opMed,_ambito)
    const opDer = Relacional(_opDer,_ambito)

    if ((opIzq.tipo === TIPO_DATO.BOOL)){
        var resultado = false
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOL,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
}
module.exports = Relacional