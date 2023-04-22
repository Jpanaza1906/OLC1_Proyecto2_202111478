const Simbolo = require("../Ambito/Simbolo");
const TIPO_DATO = require("../Enums/TipoDato");

function DeclararLista(_instruccion, _ambito){
    /*console.log("instrucciones antes: ")
    console.log(_instruccion)
    console.log("\n\n")
    console.log(_ambito)*/
    if(getTIPO_DATO(_instruccion.tipo_lista) != null){
        var valor = []
        _instruccion.valor = valor
        const nuevoSim = new Simbolo(_instruccion.id_lista, valor, getTIPO_DATO(_instruccion.tipo_lista), _instruccion.linea, _instruccion.columna)

        if (_ambito.existeSimboloAmbitoActual(nuevoSim.id) != false) {
            return "Error: La variable " + nuevoSim.id + " ya existe linea: " + nuevoSim.linea + " columna: " + nuevoSim.columna;
        }

        _ambito.addSimbolo(nuevoSim.id, nuevoSim)
        /*console.log("despues instrucciones: ")
        console.log(_instruccion)*/
        return null
    }
}

function getTIPO_DATO(_tipo_lista){
    switch (_tipo_lista){
        case TIPO_DATO.ENTERO:
            return TIPO_DATO.ENTERO

        case TIPO_DATO.DECIMAL:
            return TIPO_DATO.DECIMAL

        case TIPO_DATO.BOOL:
            return TIPO_DATO.BOOL

        case TIPO_DATO.CHAR:
            return TIPO_DATO.CHAR

        case TIPO_DATO.CADENA:
            return TIPO_DATO.CADENA

        default:
            return null
    }
}

module.exports = DeclararLista;