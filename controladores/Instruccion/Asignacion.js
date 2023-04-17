const Operacion = require("../Operaciones/Operacion");

function Asignacion(_instruccion, _ambito){
    const id =_instruccion.id;
    const existe = _ambito.existeSimbolo(id);

    if(existe){
        var valor=Operacion(_instruccion.expresion,_ambito)
        var simbolo = _ambito.getSimbolo(id);  
        var tipos = {
            tipoSimbolo:simbolo.tipo,  
            tipoNuevoValor:valor.tipo
        }

        if(tipos.tipoSimbolo === tipos.tipoNuevoValor){ //int a = 5
            simbolo.valor = valor.valor;
            _ambito.actualizar(id,simbolo);
            return null
        }

    }else{
        return "La variable " + id + " no existe Linea: " + _instruccion.linea + " columna: " + _instruccion.columna;
    }
}

module.exports = Asignacion