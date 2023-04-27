const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const TipoResultado = require("./TipoResultado")
const ValorExpresion = require("./ValorExpresion")  

function Aritmetica(_expresion,_ambito){
    if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.BOOL || _expresion.tipo === TIPO_VALOR.ENTERO ||
        _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CHAR) {
        return ValorExpresion(_expresion, _ambito) 
    
    }else if (_expresion.tipo === TIPO_OPERACION.SUMA) {
        //console.log("suma")
        return suma(_expresion.opIzq, _expresion.opDer, _ambito)
    
    }else if(_expresion.tipo === TIPO_OPERACION.RESTA){
        //console.log("resta")
        return resta(_expresion.opIzq, _expresion.opDer, _ambito)
    
    }else if(_expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        //console.log("multiplicacion")
        return multiplicacion(_expresion.opIzq, _expresion.opDer, _ambito)
    
    }else if(_expresion.tipo === TIPO_OPERACION.DIVISION){
        //console.log("division")
        return division(_expresion.opIzq, _expresion.opDer, _ambito)
    
    }else if(_expresion.tipo === TIPO_OPERACION.POTENCIA){
        //console.log("potencia")
        return potencia(_expresion.opIzq, _expresion.opDer, _ambito)

    }else if(_expresion.tipo === TIPO_OPERACION.MODULO){
        //console.log("modulo")
        return modulo(_expresion.opIzq, _expresion.opDer, _ambito)
    
    }else if(_expresion.tipo === TIPO_OPERACION.UNARIA){
        //console.log("unaria")
        return unaria(_expresion.opDer, _ambito)
    }else{
        const Operacion = require("./Operacion")
        return Operacion(_expresion,_ambito)
    }
}

function suma(_opizq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opizq, _ambito)  
    const opDer = Aritmetica(_opDer, _ambito)
    
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)  

    if (tipores != null) {
        if (tipores === TIPO_DATO.DECIMAL || tipores === TIPO_DATO.ENTERO) {
            if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {
                if (opIzq.tipo === TIPO_DATO.BOOL) {
                    if (opIzq.valor === true) {
                        const resultado = 1 + Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {
                        const resultado = 0 + Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }

                }else if (opDer.tipo === TIPO_DATO.BOOL) {
                    if (opDer.valor === true) {
                        const resultado = Number(opIzq.valor) + 1;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {
                        const resultado = Number(opIzq.valor) + 0;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }

                }
            } else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {
                if (opIzq.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number((opIzq.valor).charCodeAt(0)) + Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }

                }else if (opDer.tipo === TIPO_DATO.CHAR) {
                    const resultado = Number(opIzq.valor) + Number((opDer.valor).charCodeAt(0));
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
            } else {
                const resultado = Number(opIzq.valor) + Number(opDer.valor);
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna

                }
            }
        }
        if (tipores === TIPO_DATO.CADENA) {
            const resultado = opIzq.valor.toString() + opDer.valor.toString();
            return {
                valor: resultado,
                tipo: tipores,
                linea: _opizq.linea,
                columna: _opizq.columna

            }

        }

    }
}

function resta(_opizq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opizq, _ambito)  
    const opDer = Aritmetica(_opDer, _ambito)
    
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)  

    if (tipores != null) {
        if (opIzq.tipo === TIPO_DATO.BOOL || opDer.tipo === TIPO_DATO.BOOL) {

            if (opIzq.tipo === TIPO_DATO.BOOL) {

                if(opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DECIMAL){
                    if (opIzq.valor === true) {
                        const resultado = 1 - Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
    
                        }
                    } else {
                        const resultado = 0 - Number(opDer.valor);
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna
    
                        }
                    }
                }

            }else if (opDer.tipo === TIPO_DATO.BOOL) {

                if(opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DECIMAL){
                    if (opDer.valor === true) {
                        const resultado = Number(opIzq.valor) - 1;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    } else {
                        const resultado = Number(opIzq.valor) - 0;
                        return {
                            valor: resultado,
                            tipo: tipores,
                            linea: _opizq.linea,
                            columna: _opizq.columna

                        }
                    }
                }

            }

        }else if (opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR) {

            if (opIzq.tipo === TIPO_DATO.CHAR) {
                if(opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DECIMAL){
                    const resultado = Number((opIzq.valor).charCodeAt(0)) - Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
                
            }else if (opDer.tipo === TIPO_DATO.CHAR) {
                if(opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DECIMAL){
                    const resultado = Number(opIzq.valor) - Number((opDer.valor).charCodeAt(0));
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
            }
        
        }else {
            if(opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL ||
                opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL){
                    const resultado = Number(opIzq.valor) - Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
        }
    }
}

function multiplicacion(_opizq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opizq, _ambito)  
    const opDer = Aritmetica(_opDer, _ambito)
    
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)  

    if(tipores != null) {

        if(opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR){

            if (opIzq.tipo === TIPO_DATO.CHAR) {
                if(opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DECIMAL){
                    const resultado = Number((opIzq.valor).charCodeAt(0)) * Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
                
            }else if (opDer.tipo === TIPO_DATO.CHAR) {
                if(opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DECIMAL){
                    const resultado = Number(opIzq.valor) * Number((opDer.valor).charCodeAt(0));
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
            }
        
        }else {
            if(opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL ||
                opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL){
                    const resultado = Number(opIzq.valor) * Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
        }
    }
}

function division(_opizq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opizq, _ambito)  
    const opDer = Aritmetica(_opDer, _ambito)
    
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)  

    if(tipores != null) {

        if(opIzq.tipo === TIPO_DATO.CHAR || opDer.tipo === TIPO_DATO.CHAR){

            if (opIzq.tipo === TIPO_DATO.CHAR) {
                if(opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DECIMAL){
                    const resultado = Number((opIzq.valor).charCodeAt(0)) / Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
                
            }else if (opDer.tipo === TIPO_DATO.CHAR) {
                if(opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DECIMAL){
                    const resultado = Number(opIzq.valor) / Number((opDer.valor).charCodeAt(0));
                    return {
                        valor: resultado,
                        tipo: tipores,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
            }
        
        }else {
            if(opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL ||
                opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL){
                    const resultado = Number(opIzq.valor) / Number(opDer.valor);
                    return {
                        valor: resultado,
                        tipo: TIPO_DATO.DECIMAL,
                        linea: _opizq.linea,
                        columna: _opizq.columna

                    }
                }
        }
    }
}

function potencia(_opizq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opizq, _ambito)  
    const opDer = Aritmetica(_opDer, _ambito)
    
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)  

    if(tipores != null) {
        if(opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL ||
            opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL){
                const resultado = Number(opIzq.valor) ** Number(opDer.valor);
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna

                }
            }
    }
}

function modulo(_opizq, _opDer, _ambito){
    const opIzq = Aritmetica(_opizq, _ambito)  
    const opDer = Aritmetica(_opDer, _ambito)
    
    const tipores = TipoResultado(opIzq.tipo, opDer.tipo)  

    if(tipores != null) {
        if(opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.ENTERO && opDer.tipo === TIPO_DATO.DECIMAL ||
            opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DECIMAL && opDer.tipo === TIPO_DATO.DECIMAL){
                const resultado = Number(opIzq.valor) % Number(opDer.valor);
                return {
                    valor: resultado,
                    tipo: tipores,
                    linea: _opizq.linea,
                    columna: _opizq.columna

                }
            }
    }
}

function unaria(_opDer, _ambito){
    const opDer = Aritmetica(_opDer, _ambito)
    const tipores = TipoResultado(null, opDer.tipo)  

    if(tipores != null){
        if(opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DECIMAL){
            const resultado = -Number(opDer.valor);
            return {
                valor: resultado,
                tipo: tipores,
                linea: _opDer.linea,
                columna: _opDer.columna

            }
        }
    }
}

module.exports = Aritmetica