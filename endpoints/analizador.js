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

    app.post('/analizar', (req, res)=>{
        prueba = req.body.entrada
        ast = parser.parse(prueba)
        grafica = new Graficador(ast)

        const AmbitoGlobal = new Ambito(null, "Global")
        var cadena = Global(ast, AmbitoGlobal)

        var resultado= {
            arbol: ast,
            resultado: cadena
        }
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

    
    app.get('/error', (req, res) => {
        const myString = AgregarError(1,1,1,1,1);
        res.send(myString);
    });


    
}