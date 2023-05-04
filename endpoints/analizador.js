const Ambito = require("../controladores/Ambito/Ambito")
const Global = require("../controladores/Instruccion/Global")
const Graficador = require("../controladores/Ambito/Graficador")
const AgregarError = require("../controladores/Ambito/Error")
var fs = require("fs")
const { stdout, stderr } = require("process")

module.exports=(parser, app)=>{

    var prueba;
    var ast;
    var grafica;
    var simbolos = []

    app.post('/analizar', (req, res)=>{
        const TASimbolos = require("../controladores/Ambito/TabSimb")
        prueba = req.body.entrada
        ast = parser.parse(prueba)
        grafica = new Graficador(ast)
        simbolos = []
        var cont = 0
        const AmbitoGlobal = new Ambito(null, "Global")
        var cadena = Global(ast, AmbitoGlobal)

        var resultado= {
            arbol: ast,
            resultado: cadena
        }
        
        console.log("-------------VARIABLES-------------------------")
        console.log(TASimbolos.TabSimbolos)
        console.log(cont)
        console.log("-----------------------------------------------\n")

        for (let i = 0; i < TASimbolos.TabSimbolos.length; i++){
            const simbolo = TASimbolos.TabSimbolos[i];

            for(let temp of simbolos){
                if(simbolo.identificador === temp.identificador && simbolo.entorno === temp.entorno){
                    cont += 1
                    if(cont > 0){
                        break
                    }
                }
            }

            if(cont === 0){
                simbolos.push(simbolo)
            }
        }

        console.log("-------------------------TABLA DE SIMBOLOS---------------------------------")
        console.log(simbolos)
        TASimbolos.TabSimbolos = []
        console.log("--------------------------------------------------------")
        res.send(resultado)
    })

    app.get("/CrearAST", (req,res) =>{
        dot = grafica.graficar()
        let url = 'https://quickchart.io/graphviz?graph='; 
        fs.writeFile("./controladores/AST/AST.dot",dot,function(error){
            if(error){
                console.log(error)
            }
        });

        const {exec} = require("child_process")
            exec("dot -Tpng ./controladores/AST/AST.dot -o ./controladores/AST/AST.png", (error, stdout, stderr)=>{

                if(error){
                    console.log(error.message)
                    res.send(error.message)
                }
    
                if(stderr){
                    console.log(stderr)
                }
                res.send(url+dot)
            });
            
    })
    app.get('/simbolos', (req, res) => {
        var final = ""
        let datos = "digraph tabla{node[shape=none fontname=Helvetica]n1[label=<<table><tr><td colspan=\"5\">Tabla de simbolos</td></tr><tr><td>Identificador</td><td>Tipo</td><td>Entorno</td><td>Linea</td><td>Columna</td></tr>";
        for (let index = 0; index < simbolos.length; index++) {
            const simb = simbolos[index];
            datos += "<tr><td>" + simb.identificador + "</td><td>" + simb.tipoVar + "</td><td>" + simb.entorno + "</td><td>" + simb.linea + "</td><td>"+ simb.columna + "</td></tr>"         
        }

        datos += "</table>>]}";
        let url = 'https://quickchart.io/graphviz?graph=';    
        final =  url + datos

        console.log(final)
        res.send(final);
    });
   
    
    app.get('/error', (req, res) => {
        const myString = AgregarError(1,1,1,1,1);
        console.log(myString)
        res.send(myString);
    });


    
}