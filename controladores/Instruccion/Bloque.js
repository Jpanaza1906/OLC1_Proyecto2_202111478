const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Print = require("./Print");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");
const SentenciaIf = require("./if");
const SentenciaIfElse = require("./IfElse");
const SentenciaIfElseIf = require("./ifElseIf");
const incrementoYdecremento = require("./Increm_Decrem");
const DeclararLista = require("./Lista");
const SentenciaFor = require("./For");
const SwitchCase = require("./Switch")
const SentenciaDoWhile = require("./DoWhile")
const SentenciaWhile = require("./While")
const EjecMetodo = require("./EjeMetodo")

function Bloque(_instrucciones,_ambito){
    var cadena=""
    var breakf = true
    var continuef = true
    _instrucciones.forEach(instruccion => {
        if(!continuef){
            return;
        }
        if(!breakf){
            return;
        }
        //console.log(instruccion)
        if(instruccion.tipo===TIPO_INSTRUCCION.PRINT){
           cadena += Print(instruccion,_ambito) + "\n"
           
        }else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
            var mensaje = Declaracion(instruccion, _ambito)
            if (mensaje != null) { cadena += mensaje }

        }else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var mensaje = Asignacion(instruccion, _ambito)
            if (mensaje != null) { cadena += mensaje }
        
        }
        else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
            var ejec = SentenciaIf(instruccion, _ambito)
            var mensaje = ejec.cadena            
            if (mensaje != null) {
                cadena += mensaje
            }
            //EVALUAR SI VIENE BREAK
            try{
                if(ejec.break){
                    breakf = false
                    return{
                        cadena:mensaje
                    }
                }
            }
            catch(error){
    
            }
            //EVALUAR SI VIENE CONTINUE
            try{
                if(ejec.continue){
                    continuef = false
                    return{
                        cadena:mensaje
                    }
                }
            }
            catch(error){
            }
        }else if (instruccion.tipo === TIPO_INSTRUCCION.IFCE) {
            var ejec = SentenciaIfElse(instruccion, _ambito)
            var mensaje = ejec.cadena            
            if (mensaje != null) {
                cadena += mensaje
            }
            //EVALUAR SI VIENE BREAK
            try{
                if(ejec.break){
                    breakf = false
                    return{
                        cadena:mensaje
                    }
                }
            }
            catch(error){
    
            }
            //EVALUAR SI VIENE CONTINUE
            try{
                if(ejec.continue){
                    continuef = false
                    return{
                        cadena:mensaje
                    }
                }
            }
            catch(error){
            }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.IFCEIF){
            var ejec = SentenciaIfElseIf(instruccion, _ambito)
            var mensaje = ejec.cadena            
            if(mensaje!=null){
                cadena+=mensaje
            }
            //EVALUAR SI VIENE BREAK
            try{
                if(ejec.break){
                    breakf = false
                    return{
                        cadena:mensaje
                    }
                }
            }
            catch(error){
    
            }
            //EVALUAR SI VIENE CONTINUE
            try{
                if(ejec.continue){
                    continuef = false
                    return{
                        cadena:mensaje
                    }
                }
            }
            catch(error){
    
            }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.MASMAS ||
            instruccion.tipo === TIPO_INSTRUCCION.MENOSMENOS) {
            var mensaje = incrementoYdecremento(instruccion, _ambito)
            if (mensaje != null) { cadena += mensaje }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.LIST) {
            var mensaje = DeclararLista(instruccion, _ambito)
            if (mensaje != null) { cadena += mensaje }

        } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR) {
            var ejec = SentenciaFor(instruccion, _ambito)
            var mensaje = ejec.cadena
            if (mensaje != null) { cadena += mensaje }
        } else if (instruccion.tipo === TIPO_INSTRUCCION.SWITCHCASE){
            var ejec = SwitchCase(instruccion,_ambito)
            var mensaje = ejec.cadena
            if (mensaje != null) {cadena += mensaje}
        } else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE){
            var ejec = SentenciaWhile(instruccion,_ambito)
            var mensaje = ejec.cadena
            if(mensaje != null) {cadena += mensaje}
        } else if (instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
            var ejec = SentenciaDoWhile(instruccion,_ambito)
            var mensaje = ejec.cadena
            if(mensaje != null) {cadena += mensaje}
        } else if(instruccion.tipo === TIPO_INSTRUCCION.EJE_METODO){
            var mensaje = EjecMetodo(instruccion, _ambito)
            if (mensaje != null) { cadena += mensaje }
        } else if(instruccion.tipo === TIPO_INSTRUCCION.RETURN){
            cadena = JSON.stringify(instruccion)
            return;
        } else if(instruccion.tipo === TIPO_INSTRUCCION.BREAK){
            breakf = false
            return{cadena:cadena}
        } else if(instruccion.tipo === TIPO_INSTRUCCION.CONTINUE){
            var nambito = _ambito
            while(nambito.nombre != "Main"){
                if(nambito.nombre == "INSTRUCCIONFOR" || nambito.nombre == "WHILE" || nambito.nombre == "DOWHILE"){
                    break;
                }                
                nambito = nambito.anterior
            }
            if(nambito.nombre != "Main"){
                continuef = false
            }
            else{
                cadena = `Error: La instruccion ${instruccion.tipo} debe estar dentro de un ciclo... Linea: ${instruccion.linea} Columna: ${instruccion.columna}`
            }
        }
    });
    if(breakf == true && continuef == true){
        return { cadena:cadena }
    }
    else if(!breakf){
        return{
            cadena:cadena,
            break:true
        }
    }
    else if(!continuef){
        return{
            cadena:cadena,
            continue: true
        }
    }

}

module.exports = Bloque