const TIPO_DATO = require("../Enums/TipoDato");

function TipoResultado(_tipo1, _tipo2){
    if((_tipo1 === TIPO_DATO.DECIMAL && _tipo2=== TIPO_DATO.DECIMAL)||(_tipo1 === TIPO_DATO.ENTERO && _tipo2=== TIPO_DATO.DECIMAL)
    ||(_tipo1 === TIPO_DATO.DECIMAL && _tipo2=== TIPO_DATO.ENTERO)||(_tipo1 === TIPO_DATO.DECIMAL && _tipo2=== TIPO_DATO.BOOL)||
    (_tipo1 === TIPO_DATO.DECIMAL && _tipo2=== TIPO_DATO.CHAR)||(_tipo1 === TIPO_DATO.BOOL && _tipo2=== TIPO_DATO.DECIMAL)||
    (_tipo1 === TIPO_DATO.CHAR && _tipo2=== TIPO_DATO.DECIMAL)){
           
        return TIPO_DATO.DECIMAL
        
    }else if((_tipo1 === TIPO_DATO.ENTERO && _tipo2=== TIPO_DATO.ENTERO)||(_tipo1 === TIPO_DATO.ENTERO && _tipo2=== TIPO_DATO.BOOL)||
    (_tipo1 === TIPO_DATO.ENTERO && _tipo2=== TIPO_DATO.CHAR)||(_tipo1 === TIPO_DATO.BOOL && _tipo2=== TIPO_DATO.ENTERO)||
    (_tipo1 === TIPO_DATO.CHAR && _tipo2=== TIPO_DATO.ENTERO)){
        return TIPO_DATO.ENTERO

    }else if((_tipo1 === TIPO_DATO.CADENA || _tipo2=== TIPO_DATO.CADENA)&&(_tipo1!=null && _tipo2!=null)){
        return TIPO_DATO.CADENA

    }else if(_tipo1===null){ 
        if(_tipo2===TIPO_DATO.DECIMAL){
            return TIPO_DATO.DECIMAL
        }else if(_tipo2===TIPO_DATO.ENTERO){
            return TIPO_DATO.ENTERO
        }
    }
    return null

}
module.exports=TipoResultado