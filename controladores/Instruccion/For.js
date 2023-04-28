const Ambito = require("../Ambito/Ambito");
const Operacion = require("../Operaciones/Operacion");
const Declaracion = require("./Declaracion");
const incrementoYdecremento = require("./Increm_Decrem");

function SentenciaFor(_instruccion, _ambito){
    /*
                            PASOS PARA REALIZAR CICLO FOR
        
        1. Crear un nuevo ambito para el FOR
        2. Declarar la variable del for en ese ambito nuevo
        3. Se busca el simbolo (Ejem. i) en el ambito For y se obtiene su valor
        4. Se ingresa las condiciones y retornara un booleano
        5. Se modificara el valor de la variable usando incremento o decremento
        6. Si operacion.valor == falso, se rompera el ciclo porque ya cumplio su condicion
    */

    const Bloque = require("./Bloque");
    var nuevoAmbito = new Ambito(_ambito, "FOR");

    // SE CAMBIA EL TIPO DE QUE VIENE POR DEFECTO DE LA CONDICION A UN TIPO VAL_ENTERO
    var condicion = _instruccion.condiciones // i < 10
    condicion.opIzq.tipo = 'VAL_ENTERO'

    //                  ----------PASO 2----------
    var mensajeDeclaracion = Declaracion(_instruccion.declaracion, nuevoAmbito)
    if (mensajeDeclaracion != null) { return { cadena: mensajeDeclaracion } }
    var mensaje = ""
        // PASO 3----------
    while(true){
         //                  ----------PASO 1----------
        
        var val_variable = nuevoAmbito.getSimbolo(_instruccion.declaracion.id).valor

        //CAMBIO EL OPERADOR IZQUIERDO DE LA CONDICION QUE ESTA DE FORMA (EJEM: i < 10)
        //A UN VALOR PARA QUE SE PUEDA REALIZAR LA OPERACION LOGICA (EJEM; 2 < 10, 3 < 10, 4 < 10, etc.)
        condicion.opIzq.valor = val_variable

        //              ----------PASO 4----------
        var operacion = Operacion(_instruccion.condiciones, nuevoAmbito)

        //              ----------PASO 6----------
        if(!operacion.valor){
            return{ cadena: mensaje }
        }
        var nuevoAmbitoIns = new Ambito(nuevoAmbito,"INSTRUCCIONFOR")
        // REALIZA LA INSTRUCCION QUE SE ENCUENTRA DENTRO DEL FOR
        var ejec = Bloque(_instruccion.instrucciones, nuevoAmbitoIns)
        try{
            mensaje += ejec.cadena;
            if(ejec.break){
                return{
                    cadena:mensaje
                }
            }
        }
        catch(error){

        }
        //              ----------PASO 5----------
        incrementoYdecremento(_instruccion.actualizacion, nuevoAmbito)       
        
        try{
            if(eje.continue){
                continue;
            }
        }
        catch(error){

        }
    }
}

module.exports = SentenciaFor