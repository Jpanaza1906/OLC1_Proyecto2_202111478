const Ambito = require("../Ambito/Ambito")
const Instruccion = require("./Instruccion")
const Bloque = require("./Bloque")
const DecParametro = require("./DecParametro")

function Main(_instruccion, _ambito) {
    var metodoEjecutar = _ambito.getMetodo(_instruccion.nombre)
    
    var cadena=""
    if(metodoEjecutar!=null){
       var nuevoAmbito = new Ambito(_ambito,"Main")
       //console.log(metodoEjecutar)
       if (metodoEjecutar.lista_parametro != null) {
        if (_instruccion.lista_valores != null && metodoEjecutar.lista_parametro.length == _instruccion.lista_valores.length) {
           // console.log("entro")
            var error = false;
            for (let i = 0; i < metodoEjecutar.lista_parametro.length; i++) {
               
                var declaracionAsignacion = Instruccion.nuevaDeclaracion(metodoEjecutar.lista_parametro[i].id, _instruccion.lista_valores[i], metodoEjecutar.lista_parametro[i].tipo_dato, _instruccion.linea, _instruccion.columna)
                //console.log(declaracionAsignacion)
                var mensaje = DecParametro(declaracionAsignacion, nuevoAmbito)

                if (mensaje != null) {
                    error = true
                    cadena += mensaje + "\n"


                }
            }
            if (error) {
                return cadena
            }
            var ejec = Bloque(metodoEjecutar.instrucciones, nuevoAmbito)
            var mensaje = ejec.cadena
            
            return mensaje
        }
        else {
            
            return `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
        }

    } else{
        
            var ejec = Bloque(metodoEjecutar.instrucciones,nuevoAmbito)
            var mensaje = ejec.cadena
            return mensaje
       }
    }
    return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = Main