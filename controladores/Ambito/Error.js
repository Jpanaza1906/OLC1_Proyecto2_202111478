var TablaErrores = []
class Error{
    constructor(_tipo, _descripcion, _error, _linea, _columna){
        this.tipo = _tipo;
        this.descripcion = _descripcion;
        this.error = _error;
        this.linea = _linea;
        this.columna = _columna;
    }
}
function AgregarError(_tipo,_descripcion, _error ,_linea,_columna){
    const error = new Error(_tipo,_descripcion,_error,_linea,_columna)
    console.log(error)
}
module.exports = AgregarError