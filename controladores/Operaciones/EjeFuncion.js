const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Aritmetica = require("./Aritmetica");
const ValorExpresion = require("./ValorExpresion");
const Casteo = require("./Casteo")
const Instruccion = require("../Instruccion/Instruccion");
const DecParametro = require("../Instruccion/DecParametro");
const Ambito = require("../Ambito/Ambito")

function EjeFuncion(_expresion, _ambito){    
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
    //      CASTEO
    else if(_expresion.tipo === TIPO_INSTRUCCION.CASTEO){
        return Casteo(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_INSTRUCCION.EJE_FUNCION){
        return FuncionOp(_expresion, _ambito)
    }else{
        const Operacion = require("./Operacion")
        return Operacion(_expresion,_ambito)
    }
}
function FuncionOp(_expresion, _ambito){
    var funcionEjecutar = _ambito.getMetodo(_expresion.nombre);
    var cadena=""
    if(funcionEjecutar != null){
        if(_expresion.lista_valores != null && funcionEjecutar.lista_parametro.length == _expresion.lista_valores.length){
            var nuevoAmbito = new Ambito(_ambito, "FUNCION")  
            var error = false;
            for(let i = 0; i <funcionEjecutar.lista_parametro.length;i++){
                if(_expresion.lista_valores[i].tipo === TIPO_VALOR.IDENTIFICADOR){
                    if(_ambito.existeSimbolo(_expresion.lista_valores[i].valor)){
                        var declaracionAsignacion = Instruccion.nuevaDeclaracion(funcionEjecutar.lista_parametro[i].id, _expresion.lista_valores[i], funcionEjecutar.lista_parametro[i].tipo_dato, _expresion.linea, _expresion.columna)      
                        var mensaje = DecParametro(declaracionAsignacion,nuevoAmbito)
                    }          
                }else{
                    var declaracionAsignacion = Instruccion.nuevaDeclaracion(funcionEjecutar.lista_parametro[i].id, _expresion.lista_valores[i], funcionEjecutar.lista_parametro[i].tipo_dato, _expresion.linea, _expresion.columna)      
                    var mensaje = DecParametro(declaracionAsignacion,nuevoAmbito)
                }
                if (mensaje != null) {
                    error = true
                    cadena += mensaje + "\n"
                }
            }
            if(error) {return cadena}
            if(funcionEjecutar.instrucciones != null){                
                const Bloque = require("../Instruccion/Bloque");
                var ejec = Bloque(funcionEjecutar.instrucciones, nuevoAmbito)
            }
            return EjeFuncion(funcionEjecutar.rexpresion,nuevoAmbito)
        }else{
            return `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }
        
    }else{
        return `Error: El método ${_expresion.nombre} no existe... Linea: ${_expresion.linea} Columna: ${_expresion.columna}`
    }

}
module.exports = FuncionOp;