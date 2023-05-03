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
            
            }else if(instruccion.tipo === TIPO_INSTRUCCION.DEC_FUNCION){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"DEC_FUNCION\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarFuncion(instruccion, nombreHijo)
            
            }else if(instruccion.tipo === TIPO_INSTRUCCION.LIST){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"DEC_LISTA\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarLista(nombreHijo, instruccion)
            
            }else if (instruccion.tipo === TIPO_INSTRUCCION.VEC_VACIO) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DEC_VECTOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDecVacio(instruccion, nombreHijo)

            } 
            else if (instruccion.tipo === TIPO_INSTRUCCION.VEC_VALORES) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DEC_VECTOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDecValores(instruccion, nombreHijo)

            }else if (instruccion.tipo === TIPO_INSTRUCCION.MOD_VECTORES) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"MOD_VECTOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarModVector(instruccion, nombreHijo)

            }

            /*
            COLOCAR TODAVIA LO QUE RESTA DEL AMBITO GLOBAL
                - VECTONRES
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
            else if(instruccion.tipo === TIPO_INSTRUCCION.SWITCHCASE){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"SWITCH\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                const cases = instruccion.cases
                for(const ncase of cases){
                    let casen = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += casen + `[label = \"${"CASE"} \n ${ncase.expresion.valor}\"];\n`
                    this.grafo += nombreHijo + "->" + casen + ";\n"
                    const instruccionescase = ncase.instrucciones
                    for(const nins of instruccionescase){
                        this.graphInstruccionindividual(nins, casen)
                    }
                }
            }else if(instruccion.tipo === TIPO_INSTRUCCION.FOR){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"FOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                /*
                        NODOS HIJOS
                1. DECLARACION
                2. CONDICION
                3. ACTUALIZACION
                4. INSTRUCCION
                */
                var nombreHijo1 = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo1 + "[label = \"DECLARACION\"];\n"
                this.grafo += nombreHijo + "->" + nombreHijo1 + ";\n"
                this.graficarDeclaracion(instruccion.declaracion, nombreHijo1);

                var nombreHijo2 = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo2 + "[label = \"CONDICION\"];\n"
                this.grafo += nombreHijo + "->" + nombreHijo2 + ";\n"
                this.graficarOperacion(instruccion.condiciones, nombreHijo2);

                var nombreHijo3 = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo3 + "[label = \"ACTUALIZACION\"];\n"
                this.grafo += nombreHijo + "->" + nombreHijo3 + ";\n"
                this.graficarOperacion(instruccion.actualizacion, nombreHijo3);

                var nombreHijo4 = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo4 + "[label = \"INSTRUCCIONES\"];\n"
                this.grafo += nombreHijo + "->" + nombreHijo4 + ";\n"
                this.recorrerInstrucciones(nombreHijo4, instruccion.instrucciones);
            }else if(instruccion.tipo === TIPO_INSTRUCCION.IF){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"IF\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo)

                var HijoInstr = "Nodo" + this.contador
                this.contador++;
                this.grafo += HijoInstr + "[label = \"INSTRUCCIONES\"];\n"
                this.grafo += nombreHijo + "->" + HijoInstr + ";\n"

                this.recorrerInstrucciones(HijoInstr, instruccion.instrucciones)

            }else if(instruccion.tipo === TIPO_INSTRUCCION.IFCE){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"IF\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                
                this.graficarOperacion(instruccion.expresion, nombreHijo)

                var HijoInstr = "Nodo" + this.contador
                this.contador++;
                this.grafo += HijoInstr + "[label = \"INSTRUCCIONES\"];\n"
                this.grafo += nombreHijo + "->" + HijoInstr + ";\n"

                this.recorrerInstrucciones(HijoInstr, instruccion.instruccionesIf)

                var nombreHijo1 = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo1 + "[label = \"ELSE\"];\n"
                this.grafo += nombreHijo + "->" + nombreHijo1 + ";\n"
                this.recorrerInstrucciones(nombreHijo1, instruccion.instruccionesElse)

            }else if(instruccion.tipo === TIPO_INSTRUCCION.IFCEIF){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"IF\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                
                this.graficarOperacion(instruccion.expresion, nombreHijo)

                var HijoInstr = "Nodo" + this.contador
                this.contador++;
                this.grafo += HijoInstr + "[label = \"INSTRUCCIONES\"];\n"
                this.grafo += nombreHijo + "->" + HijoInstr + ";\n"

                this.recorrerInstrucciones(HijoInstr, instruccion.instruccionesIf)

                const lista = instruccion.lista_elseif
                for(const ncase of lista){
                    let casen = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += casen + `[label = \"${"ELSE IF"}\"];\n`;
                    this.grafo += nombreHijo + "->" + casen + ";\n"
                    const instruccionescase = ncase.instruccionesElseIf
                    for(const nins of instruccionescase){
                        this.graphInstruccionindividual(nins, casen)
                    }
                }

                if(instruccion.instruccionesElse != null){
                    var nombreHijo1 = "Nodo" + this.contador
                    this.contador++;
                    this.grafo += nombreHijo1 + "[label = \"ELSE\"];\n"
                    this.grafo += nombreHijo + "->" + nombreHijo1 + ";\n"
                    this.recorrerInstrucciones(nombreHijo1, instruccion.instruccionesElse)
                }
                
            }else if(instruccion.tipo === TIPO_INSTRUCCION.WHILE){
                var nombreHijo = "Nodo" + this.contador                
                this.contador++
                this.grafo += nombreHijo + "[label = \"WHILE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion,nombreHijo)
                const instruccioneswhile = instruccion.instrucciones 
                let exp = "Nodo" + this.contador
                this.contador++
                this.grafo += exp + "[label = \"INSTRUCCIONES\"];\n"
                this.grafo += nombreHijo + "->" + exp +";\n"
                this.grafo += exp + "->" + nombreHijo +";\n"
                for(const ninstruccion of instruccioneswhile){
                    this.graphInstruccionindividual(ninstruccion,exp)
                }

            }else if(instruccion.tipo === TIPO_INSTRUCCION.DOWHILE){
                var nombreHijo = "Nodo" + this.contador                
                this.contador++
                this.grafo += nombreHijo + "[label = \"DO\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                let ins = "Nodo" + this.contador
                this.contador++
                this.grafo += ins + "[label = \"INSTRUCCIONES\"];\n"
                this.grafo += nombreHijo + "->" + ins + ";\n"
                const instruccionesdo = instruccion.instrucciones 

                for(const ninstruccion of instruccionesdo){
                    this.graphInstruccionindividual(ninstruccion,ins)
                }
                let we = "Nodo" + this.contador
                this.contador++
                this.grafo += we + "[label = \"WHILE\"];\n"
                this.grafo += nombreHijo + "->" + we + ";\n"
                this.grafo += we + "->" + nombreHijo + ";\n"
                this.graficarOperacion(instruccion.expresion, we)

            }else if(instruccion.tipo === TIPO_INSTRUCCION.EJE_METODO){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"EJEC_METODO\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"

                var nombreHijo1 = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo1 + "[label = \" VAL_IDENTIFICADOR\n"+ instruccion.nombre +"()\"];\n"
                this.grafo += nombreHijo + "->" + nombreHijo1 + ";\n"

                if(instruccion.lista_valores !== null){
                    var parametro = `Nodo${this.contador}`
                    this.grafo += parametro + `[label = \"PARAMETROS\"];\n`;
                    this.grafo += nombreHijo + "->" + parametro + ";\n"
                    this.contador++;

                    for (let i = 0; i < instruccion.lista_valores.length; i++){
                        this.graficarDeclaracionMETODO(instruccion.lista_valores[i], parametro)
                    }
                }

            }else if(instruccion.tipo === TIPO_INSTRUCCION.RETURN){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"RETURN\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"

                this.graficarOperacion(instruccion.expresion, nombreHijo)

            }else if(instruccion.tipo === TIPO_INSTRUCCION.CONTINUE){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"CONTINUE\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
            
            }else if(instruccion.tipo === TIPO_INSTRUCCION.BREAK){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"BREAK\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
            
            }else if(instruccion.tipo === TIPO_INSTRUCCION.LIST){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label = \"DEC_LISTA\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarLista(nombreHijo, instruccion)
            
            }else if (instruccion.tipo === TIPO_INSTRUCCION.VEC_VACIO) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DEC_VECTOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDecVacio(instruccion, nombreHijo)

            }else if (instruccion.tipo === TIPO_INSTRUCCION.VEC_VALORES) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"DEC_VECTOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarDecValores(instruccion, nombreHijo)

            }else if (instruccion.tipo === TIPO_INSTRUCCION.MOD_VECTORES) {
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"MOD_VECTOR\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"
                this.graficarModVector(instruccion, nombreHijo)

            }else if(instruccion.tipo === TIPO_INSTRUCCION.ADD_LIST){
                var nombreHijo = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo + "[label=\"ADD_LIST\"];\n"
                this.grafo += _padre + "->" + nombreHijo + ";\n"

                var nombreHijo1 = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo1 + "[label=\"IDENTIFICADOR\n"+instruccion.id+"\"];\n"
                this.grafo += nombreHijo + "->" + nombreHijo1 + ";\n"

                var nombreHijo2 = "Nodo" + this.contador
                this.contador++;
                this.grafo += nombreHijo2 + "[label=\"VALOR\"];\n"
                this.grafo += nombreHijo + "->" + nombreHijo2 + ";\n"
                this.graficarOperacion(instruccion.expresion, nombreHijo2)
            }
        });
    }

    graficarLista(_padre, instruccion){
        var nombreHijo = "Nodo" + this.contador
        this.contador++;
        this.grafo += nombreHijo + "[label = \"IDENTIFICADOR\n"+instruccion.id_lista+"\"];\n"
        this.grafo += _padre + "->" + nombreHijo + ";\n"

        var nombreHijo1 = "Nodo" + this.contador
        this.contador++;
        this.grafo += nombreHijo1 + "[label = \"TIPO\n"+instruccion.tipo_lista+"\"];\n"
        this.grafo += _padre + "->" + nombreHijo1 + ";\n"
    }

    graphInstruccionindividual(instruccion,_padre){
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

    graficarDeclaracionMETODO(_instruccion, _padre){
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label = \"TIPO \n ${_instruccion.tipo}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + `;\n`;
        this.contador++;


        if(_instruccion.valor != null){

            var nombreVar = `Nodo${this.contador}`;
            this.grafo += nombreVar + `[label = \"VALOR \n ${_instruccion.valor}\"];\n`;
            this.grafo += _padre + `->` + nombreVar + ";\n";
            this.contador++;
            this.graficarOperacion(_instruccion.valor, _padre)
        }else{     
            this.graficarOperacion(_instruccion, _padre)
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
            this.grafo += value3 + `[label = \"${"False"}\"];\n`; 
            this.grafo += padre + `->` + value3 + `;\n`;
            this.contador++;
            this.graficarOperacion(_expresion.opDer, value3)
        } else if(_expresion.tipo === TIPO_INSTRUCCION.CASTEO){
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label = \"${"CASTEO"}\"];\n`;            
            this.grafo += _padre + `->` + value + `;\n`;        
            this.contador++;
            var value2 = `Nodo${this.contador}`;                   
            var padre =  `Nodo${this.contador - 1}`;                       
            this.grafo += value2 + `[label = \"${_expresion.tipoC}\"];\n`; 
            this.grafo += padre + `->` + value2 + `;\n`;
            this.contador++;
            this.graficarOperacion(_expresion.expresion, value2) 
        
        }else if(_expresion.tipo === TIPO_INSTRUCCION.EJE_FUNCION){
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label = \"EJEC_FUNCION\"];\n`;            
            this.grafo += _padre + `->` + value + `;\n`;        
            this.contador++;

            this.grafo += `Nodo${this.contador}` + `[label = \"VAL_IDENTIFICADOR\n${_expresion.nombre}\"];\n`;            
            this.grafo += value + `->` + `Nodo${this.contador}` + `;\n`;        
            this.contador++;

            if(_expresion.lista_valores != null){
                var parametro = `Nodo${this.contador}`
                this.grafo += parametro + `[label = \"PARAMETROS\"];\n`;
                this.grafo += value + "->" + parametro + ";\n"
                this.contador++;
    
                for (let i = 0; i < _expresion.lista_valores.length; i++){
                    this.graficarDeclaracionMETODO(_expresion.lista_valores[i], parametro)
                }
            }
        
        }else if(_expresion.tipo === TIPO_OPERACION.LENGTH || _expresion.tipo === TIPO_OPERACION.ROUND || _expresion.tipo === TIPO_OPERACION.TOCHARARRAY||
            _expresion.tipo === TIPO_OPERACION.TOLOWER || _expresion.tipo === TIPO_OPERACION.TOSTRING || _expresion.tipo === TIPO_OPERACION.TOUPPER ||
            _expresion.tipo === TIPO_OPERACION.TRUNCATE || _expresion.tipo === TIPO_OPERACION.TYPEOF){
                var tipoVar = `Nodo${this.contador}`
                this.grafo += tipoVar + `[label = \"TIPO \n ${_expresion.tipo}\"];\n`;
                this.grafo += _padre + "->" + tipoVar + `;\n`;
                this.contador++;

                this.graficarOperacion(_expresion.expresion, tipoVar)
            
        }else if(_expresion.tipo_dato === TIPO_INSTRUCCION.ACCESO_VECTORES){
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label=\" ${_expresion.tipo_dato}\"];\n`;
            this.grafo += _padre + "->" + value + ";\n"
            this.contador++;

            var value2 = `Nodo${this.contador}`;
            this.grafo += value2 + `[label=\"IDENTIFICADOR\n${_expresion.id}\"];\n`;
            this.grafo += value + "->" + value2 + ";\n"
            this.contador++;

            var indice = `Nodo${this.contador}`;
            this.grafo += indice + `[label=\"INDICE \"];\n`;
            this.grafo += value + "->" + indice + ";\n"
            this.contador++;

            this.graficarOperacion(_expresion.indice, indice)
        
        }else if(_expresion.tipo_dato === TIPO_INSTRUCCION.ACCESO_LIST){
            var value = `Nodo${this.contador}`;
            this.grafo += value + `[label=\" ${_expresion.tipo_dato}\"];\n`;
            this.grafo += _padre + "->" + value + ";\n"
            this.contador++;

            var value2 = `Nodo${this.contador}`;
            this.grafo += value2 + `[label=\"IDENTIFICADOR\n${_expresion.id}\"];\n`;
            this.grafo += value + "->" + value2 + ";\n"
            this.contador++;

            var indice = `Nodo${this.contador}`;
            this.grafo += indice + `[label=\"INDICE \"];\n`;
            this.grafo += value + "->" + indice + ";\n"
            this.contador++;
            this.graficarOperacion(_expresion.indice, indice)
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

    graficarDecVacio(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"TIPO \n ${_instruccion.tipoVec}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;

        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label=\"IDENTIFICADOR \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++;

        var tamanio = `Nodo${this.contador}`
        this.grafo += tamanio + `[label=\"TAMAÑO \"];\n`;
        this.grafo += _padre + "->" + tamanio + ";\n"
        this.contador++;
        
        this.graficarOperacion(_instruccion.tamanio, tamanio)
    }

    graficarDecValores(_instruccion, _padre) {
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"TIPO \n ${_instruccion.tipoVec}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;

        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label=\"IDENTIFICADOR \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++;

        for (let i = 0; i < _instruccion.listaValores.length; i++) {

            var tipoVar2 = `Nodo${this.contador}`
            this.grafo += tipoVar2 + `[label=\"VALORES\"];\n`;
            this.grafo += nombreVar + "->" + tipoVar2 + ";\n"
            this.contador++;
            this.graficarOperacion(_instruccion.listaValores[i], tipoVar2)
        }
    }

    graficarModVector(_instruccion, _padre) {
        var nombreVar = `Nodo${this.contador}`
        this.grafo += nombreVar + `[label=\"IDENTIFICADOR \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + nombreVar + ";\n"
        this.contador++;

        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label=\"POSICION \"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;

        this.graficarOperacion(_instruccion.posicion, tipoVar)

        if (_instruccion.valor != null) {
            var tipoVar2 = `Nodo${this.contador}`
            this.grafo += tipoVar2 + `[label=\"EXPRESION\"];\n`;
            this.grafo += _padre + "->" + tipoVar2 + ";\n"
            this.contador++;
            this.graficarOperacion(_instruccion.valor, tipoVar2)
        }
    }

    graficarAsignacion(_instruccion, _padre){
        var tipoVar = `Nodo${this.contador}`
        this.grafo += tipoVar + `[label = \"IDENTIFICADOR \n ${_instruccion.id}\"];\n`;
        this.grafo += _padre + "->" + tipoVar + ";\n"
        this.contador++;
        this.graficarOperacion(_instruccion.expresion, _padre)
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

    graficarFuncion(_instruccion, _padre){
        var tipoVar1 = `Nodo${this.contador}`
        this.grafo += tipoVar1 + `[label = \"TIPO \n ${_instruccion.tipof}\"];\n`;
        this.grafo += _padre + "->" + tipoVar1 + ";\n"
        this.contador++;

        var tipoVar2 = `Nodo${this.contador}`
        this.grafo += tipoVar2 + `[label = \"IDENTIFICADOR \n ${_instruccion.nombre}\"];\n`;
        this.grafo += _padre + "->" + tipoVar2 + ";\n"
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

        if(_instruccion.instrucciones != null){
            var instruccion = `Nodo${this.contador}`
            this.grafo += instruccion + `[label = \"INSTRUCCIONES\"];\n`
            this.grafo += _padre + "->" + instruccion + ";\n"
            this.contador++;
            this.recorrerInstrucciones(instruccion, _instruccion.instrucciones)
        }

        var tipoVar3 = `Nodo${this.contador}`
        this.grafo += tipoVar3 + `[label = \"RETURN\"];\n`;
        this.grafo += _padre + "->" + tipoVar3 + ";\n"
        this.contador++;
        this.graficarOperacion(_instruccion.rexpresion, tipoVar3)
    }
}

module.exports = Graficador;