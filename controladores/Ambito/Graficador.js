const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")


class Graficador{

    constructor(_raiz){
        this.grafo = ""
        this.raiz = _raiz
        this.contador = 0
    }

    graficar(){
        this.grafo = "digraph G {\n"
        this.grafo += "node [shape = \"box\"]\n"
        this.grafo += "Nodo0[label = \"RAIZ\"];\n"
        this.contador = 1
        this.recorrerAST("Nodo0", this.raiz)
        this.grafo += "}\n"
        return this.grafo
    }

    recorrerAST(_padre, _hijo){// AMBITO GLOBAL
        _hijo.forEach(instruccion =>{
            if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"DECLARACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDeclaracion(instruccion, nombreHijo)
            
            }else if(instruccion.tipo === TIPO_INSTRUCCION.MAIN){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"MAIN\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarMain(instruccion, nombreHijo)
            
            }else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"ASIGNACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarAsignacion(instruccion, nombreHijo)
            
            }else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_METODO){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"DEC_METODO\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarmetodo(instruccion, nombreHijo)
            }

            /*
            COLOCAR TODAVIA LO QUE RESTA DEL AMBITO GLOBAL
                - VECTONRES
                - LISTAS
                - FUNCIONES
            */  
        });
    }

    recorrerInstrucciones(_padre, _hijo){ //BLQOUES
        _hijo.forEach(instruccion =>{
            if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"DECLARACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDeclaracion(instruccion, nombreHijo)
            
            }else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"ASIGNACION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarAsignacion(instruccion, nombreHijo)
            
            }else if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"PRINT\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)
            }
            else if(instruccion.tipo === TIPO_INSTRUCCION.MASMAS || instruccion.tipo === TIPO_INSTRUCCION.MENOSMENOS){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + `[label = \"${instruccion.tipo}\n ${this.getSimboloDecInc(instruccion.tipo)}\"];\n`;
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion, nombreHijo)
            }

            /*
            COLOCAR TODAVIA LO QUE RESTA DE BLOQUE
                - WHILE
                - FOR
                - IF
                - ETC
            */ 
        });
    }

    graficarDeclaracion(_instruccion, _padre){
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label = \"TIPO \n ${_instruccion.tipo_dato}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + `;\n`;
        this.contador++;
        var nombreVar = `Nodo${this.contador}`;
        this.grafo += nombreVar + `[label = \"ID \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + `->` + nombreVar + ";\n";
        this.contador++;

        if(_instruccion.valor != null){
            this.graficarOperacion(_instruccion.valor, _padre)
        }
    }

    graficarOperacion(_expresion, _padre){
        if (_expresion.tipo === TIPO_VALOR.DECIMAL || _expresion.tipo === TIPO_VALOR.ENTERO || _expresion.tipo === TIPO_VALOR.BOOL ||
            _expresion.tipo === TIPO_VALOR.CHAR || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR || _expresion.tipo === TIPO_VALOR.CADENA) {
            var exp = _expresion.valor.toString()
            exp = exp.replace(/\"/gi, '\\\"')
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label = \" ${_expresion.tipo}\n ${exp}\"];\n`;
            this.grafo += _padre + `->` + value + `;\n`;
            this.contador++;

        } else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA || _expresion.tipo === TIPO_OPERACION.DIVISION ||
            _expresion.tipo === TIPO_OPERACION.MULTIPLICACION || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO ||
            _expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE || _expresion.tipo === TIPO_OPERACION.MENOR ||
            _expresion.tipo === TIPO_OPERACION.MENORIGUAL || _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL ||
            _expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND) {
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label = \"${_expresion.tipo}\n ${this.getSimbolo(_expresion.tipo)}\"];\n`;
            this.grafo += _padre + `->` + value + `;\n`;
            this.contador++;
            this.graficarOperacion(_expresion.opIzq, value)
            this.graficarOperacion(_expresion.opDer, value)

        } else if(_expresion.tipo === TIPO_INSTRUCCION.MASMAS || _expresion.tipo === TIPO_INSTRUCCION.MENOSMENOS){
            var valor = _expresion.expresion.opIzq.toString()
            valor = valor.replace(/\"/gi, '\\\"')
            this.grafo += `Nodo${this.contador}` + `[label = \" VAL_IDENTIFICADOR\n ${valor}\"];\n`;
            this.grafo += _padre + `->` + `Nodo${this.contador}` + `;\n`;
            this.contador++;

            var exp = _expresion.expresion.opDer.toString()
            exp = exp.replace(/\"/gi, '\\\"')
            
            if(_expresion.tipo === TIPO_INSTRUCCION.MASMAS){
                this.grafo += `Nodo${this.contador}` + `[label = \" VALOR SUMADO\n ${exp}\"];\n`;
            }else{
                this.grafo += `Nodo${this.contador}` + `[label = \" VALOR RESTADO\n ${exp}\"];\n`;
            }
            
            this.grafo += _padre + `->` + `Nodo${this.contador}` + `;\n`;
            this.contador++;

        }else if (_expresion.tipo === TIPO_OPERACION.UNARIA || _expresion.tipo === TIPO_OPERACION.NOT) {
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label = \"${_expresion.tipo}\n ${this.getSimbolo(_expresion.tipo)}\"];\n`;
            this.grafo += _padre + `->` + value + `;\n`;
            this.contador++;
            this.graficarOperacion(_expresion.opDer, value)
        } else if (_expresion.tipo === TIPO_OPERACION.TERNARIO){
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label = \"${_expresion.tipo}\"];\n`;
            this.grafo += _padre + `->` + value + `;\n`;            
            this.contador++;
            this.graficarOperacion(_expresion.opIzq, value)            
            var value2 = `Nodo${this.contador}`;         
            var padre =  `Nodo${this.contador - 1}`;            
            this.grafo += value2 + `[label = \"${"True"}\"];\n`;           
            this.grafo += padre + `->` + value2 + `;\n`;
            this.contador++;
            this.graficarOperacion(_expresion.opMed, value2)
            var value3 = `Nodo${this.contador}`;         
            var padre =  `Nodo${this.contador - 1}`;           
            this.grafo += value3 + `[label = \"${"False"}\"];\n`; 
            this.grafo += padre + `->` + value3 + `;\n`;
            this.contador++;
            this.graficarOperacion(_expresion.opDer, value3)
        }
    }
    getSimboloDecInc(_tipo){
        switch (_tipo){
            case TIPO_INSTRUCCION.MASMAS:
                return "++"

            case TIPO_INSTRUCCION.MENOSMENOS:
                return "--"
        }
    }
    getSimbolo(_tipo){
        switch (_tipo){
            case TIPO_OPERACION.SUMA:
                return "+"
            
            case TIPO_OPERACION.RESTA:
                return "-"

            case TIPO_OPERACION.MULTIPLICACION:
                return "*"

            case TIPO_OPERACION.DIVISION:
                return "/"

            case TIPO_OPERACION.POTENCIA:
                return "^"

            case TIPO_OPERACION.MODULO:
                return "%"

            case TIPO_OPERACION.UNARIA:
                return "-"

            case TIPO_OPERACION.IGUALIGUAL:
                return "=="

            case TIPO_OPERACION.DIFERENTE:
                return "!="

            case TIPO_OPERACION.MENOR:
                return "<"

            case TIPO_OPERACION.MENORIGUAL:
                return "<="

            case TIPO_OPERACION.MAYOR:
                return ">"

            case TIPO_OPERACION.MAYORIGUAL:
                return ">="

            case TIPO_OPERACION.OR:
                return "||"

            case TIPO_OPERACION.AND:
                return "&&"

            case TIPO_OPERACION.NOT:
                return "!"
        }
    }

    graficarMain(_instruccion, _padre){
        var tipoVar = `Nodo${this.contador}`;
        this.grafo += tipoVar + `[label = \"LLAMADA \n ${_instruccion.nombre}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;

        if(_instruccion.lista_valores != null){
            var parametro = `Nodo${this.contador}`;
            this.grafo += parametro + `[label = \"PARAMETROS\"];\n`;
            this.grafo += _padre + "->" + parametro + ";\n"
            this.contador++;

            for (let i = 0; i < _instruccion.lista_valores.length; i++){
                this.graficarOperacion(_instruccion.lista_valores[i], parametro)
            }

        }
    }

    graficarAsignacion(_instruccion, _padre){
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label = \"IDENTIFICADOR \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;
        this.graficarOperacion(_instruccion.valor, _padre)
    }

    graficarmetodo(_instruccion, _padre){
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label = \"IDENTIFICADOR \n ${_instruccion.nombre}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;

        if(_instruccion.lista_parametros != null){
            var parametro = `Nodo${this.contador}`
            this.grafo += parametro + `[label = \"PARAMETROS\"];\n`;
            this.grafo += _padre + "->" + parametro + ";\n"
            this.contador++;

            for (let i = 0; i < _instruccion.lista_parametros.length; i++){
                this.graficarDeclaracion(_instruccion.lista_parametros[i], parametro)
            }
        }

        var instruccion = `Nodo${this.contador}`
        this.grafo += instruccion + `[label = \"INSTRUCCIONES\"];\n`
        this.grafo += _padre + "->" + instruccion + ";\n"
        this.contador++;
        this.recorrerInstrucciones(instruccion, _instruccion.instrucciones)
    }            
}

module.exports = Graficador;