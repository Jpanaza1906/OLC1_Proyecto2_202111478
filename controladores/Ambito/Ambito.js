const RTSimbolos = require("./TabSimb");

class TablaSimbolos {
    constructor(identificador_, tipoSimbolo_, tipoVar_, entorno_, linea_, columna_){
        this.identificador = identificador_;
        this.tipoSimbolo = tipoSimbolo_;
        this.tipoVar = tipoVar_;
        this.entorno = entorno_;
        this.linea = linea_;
        this.columna = columna_;
    }
}

function getEntornoCad(ambito_actual) {
    let listaEntornos = []
    amb = ambito_actual

    while(amb != null){
        listaEntornos.push(amb.nombre)
        amb = amb.anterior
    }

    listaEntornos.reverse()
    return (listaEntornos.length > 0 )? listaEntornos.join("_") : listaEntornos.join("");
}


class Ambito{

    constructor(_anterior, _actual){   // new Ambito(null, "global")
        this.anterior = _anterior;
        this.nombre = _actual;
        this.tablaSimbolos = new Map();
        this.tablaMetodos = new Map();
    }

    addSimbolo(_clave, _simbolo){ //agregar simbolo
        this.tablaSimbolos.set(_clave.toLowerCase(), _simbolo)  
        let tabla = new TablaSimbolos(
            _simbolo.id,
            _simbolo.tipoSimbolo,
            _simbolo.tipo, 
            getEntornoCad(this),
            _simbolo.linea,
            _simbolo.columna
        )

        RTSimbolos.TabSimbolos.push(tabla)
    }

    recorrerTablaSimbolos(){
        this.tablaSimbolos.forEach((valor, clave) => {
            console.log(`Clave: ${clave}, Valor: ${valor}`);
        });
    }
    getSimbolo(_clave){  //retornar simbolo
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if(encontrado!=null){ return encontrado }
        }
        return null
    }

    existeSimbolo(_clave){  //retornar simbolo
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if(encontrado!=null){ return true }
        }
        return false
    }

    existeSimboloAmbitoActual(_clave){  //retornar simbolo
        var encontrado = this.tablaSimbolos.get(_clave.toLowerCase())
        if(encontrado!=null){ return true }
        return false
    }

    actualizar(_clave,_simbolo){
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaSimbolos.get(_clave.toLowerCase())
            if(encontrado!=null){
                e.tablaSimbolos.set(_clave,_simbolo)
                return true;
            }
        }
        return false;
    }

    addMetodo(_s, _metodo){ //agregar metodo
        this.tablaMetodos.set(_s.toLowerCase(), _metodo)
    }

    getMetodo(_s){ //(hola, clase simbolo)
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) //hola<=>HoLA
            if(encontrado!=null){ return encontrado }
        }
        return null
    }
    existeMetodo(_s){ //verificar si existe metodo
        for(let e=this; e!=null; e=e.anterior){
            var encontrado = e.tablaMetodos.get(_s.toLowerCase()) 
            if(encontrado!=null){ return true }
        }
        return false
    }
}

module.exports= Ambito