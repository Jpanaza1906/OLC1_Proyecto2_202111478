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
    if(_tipo == 1){
        return grafica()
    }
    const error = new Error(_tipo,_descripcion,_error,_linea,_columna)
    TablaErrores.push(error)
}
function grafica(){
    let datos = "digraph tabla{node[shape=none fontname=Helvetica]n1[label=<<table><tr><td colspan=\"4\">Errores</td></tr><tr><td>Tipo</td><td>Descripcion</td><td>Linea</td><td>Columna</td></tr>";
    for (let index = 0; index < TablaErrores.length; index++) {
        const err = TablaErrores[index];
        datos += "<tr><td>" + err.tipo + "</td><td>" + err.descripcion + "</td><td>" + err.linea + "</td><td>" + err.columna + "</td></tr>"        
    }
    datos += "</table>>]}";
    let url = 'https://quickchart.io/graphviz?graph=';    
    return url + datos
}
module.exports = AgregarError