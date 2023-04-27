const Instruccion = require("./Instruccion");
const DecParametro = require("./DecParametro");
const TIPO_VALOR = require("../Enums/TipoValor")
const Ambito = require("../Ambito/Ambito");

function EjecMetodo(_instruccion, _ambito) {
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    var cadena=""

    if(metodoEjecutar!=null){
        const Bloque = require("./Bloque")

       if (metodoEjecutar.lista_parametro != null) {
            if (_instruccion.lista_valores != null && metodoEjecutar.lista_parametro.length == _instruccion.lista_valores.length) {
                var nuevoAmbito = new Ambito(_ambito, "METODO")                
                var error = false;
                for (let i = 0; i < metodoEjecutar.lista_parametro.length; i++) {
                    if(_instruccion.lista_valores[i].tipo === TIPO_VALOR.IDENTIFICADOR){                    
                        if(_ambito.existeSimbolo(_instruccion.lista_valores[i].valor)){                                                  
                            var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametro[i].id, _instruccion.lista_valores[i], metodoEjecutar.lista_parametro[i].tipo_dato, _instruccion.linea, _instruccion.columna)                            
                            var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)
                        }
                    }
                    else{
                        var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametro[i].id, _instruccion.lista_valores[i], metodoEjecutar.lista_parametro[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                        var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)
                    }
                    
                    if (mensaje != null) {
                        error = true
                        cadena += mensaje + "\n"
                    }

                }

                if (error) { return cadena }
                var ejec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
                var mensaje = ejec.cadena                
                return mensaje

            }else{
                return `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
            }

        }else{
            const Bloque = require("./Bloque")
            var ejec = Bloque(metodoEjecutar.instrucciones, _ambito)
            var mensaje = ejec.cadena
            return mensaje
        }
    }
    return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = EjecMetodo