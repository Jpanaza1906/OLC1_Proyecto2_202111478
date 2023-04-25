const Instruccion = require("./Instruccion");
const DecParametro = require("./DecParametro");


function EjecMetodo(_instruccion, _ambito) {
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    var cadena=""

    if(metodoEjecutar!=null){
        const Bloque = require("./Bloque")

       if (metodoEjecutar.lista_parametro != null) {
            if (_instruccion.lista_valores != null && metodoEjecutar.lista_parametro.length == _instruccion.lista_valores.length) {
                var error = false;
                for (let i = 0; i < metodoEjecutar.lista_parametro.length; i++) {

                    var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametro[i].id, _instruccion.lista_valores[i], metodoEjecutar.lista_parametro[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                    var mensaje = DecParametro(declaracionAsignacion, _ambito)

                    if (mensaje != null) {
                        error = true
                        cadena += mensaje + "\n"
                    }

                }

                if (error) { return cadena }
                var ejec = Bloque(metodoEjecutar.instrucciones, _ambito)
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