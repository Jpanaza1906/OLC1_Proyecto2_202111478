class Funcion{
    constructor(_tipof,_id,_lista_parametro,_instrucciones,_rexpresion,_linea,_columna){
        this.tipof = _tipof;
        this.id = _id;
        this.lista_parametro = _lista_parametro;
        this.instrucciones = _instrucciones;
        this.rexpresion = _rexpresion;
        this.linea = _linea;
        this.columna = _columna;
    }
}
module.exports = Funcion