import './App.css';
import  { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function App() {
  const [code, setCode] = useState('');
  const [resultado, setResultado] = useState('');
  
  function analizar(){
    axios.post('http://localhost:5000/analizar', {
      entrada: code
    })
    .then(function (response) {
      console.log(response);
      setResultado(response.data.resultado);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function graficar_AST(){
    axios.get('http://localhost:5000/CrearAST')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleChange = (event) => {
    let upload = document.getElementById("upload");
    let fr = new FileReader();
    fr.readAsText(upload.files[0]);

    fr.onload = function(){
      setCode("")
      setCode(fr.result)
    };
  }
  

  return (
    <div className="App">

      <ul className="nav nav-tabs" id="barra_superior">

      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="https://chat.openai.com/" role="button" aria-expanded="false">Home</a>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="https://chat.openai.com/">Nueva Pestaña</a></li>
          <li><a className="dropdown-item" href="https://chat.openai.com/">Cerrar Pestaña</a></li>
        </ul>
      </li>

      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="https://chat.openai.com/" role="button" aria-expanded="false">Editor</a>
        <ul className="dropdown-menu">


          <li><a className="dropdown-item" href="https://chat.openai.com/">Crear Archivo</a></li>
          <li>
            <a className="dropdown-item" href="https://chat.openai.com/" style={{position:'relative'}}>
              <input type="file" id="upload" onChange={handleChange} style={{position:'absolute', top:0, left:0, opacity:0}}/> 
              Abrir Archivo
            </a>
          </li>

          <li><a className="dropdown-item" href="https://chat.openai.com/">Guardar Archivo</a></li>
        </ul>
      </li>

      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="https://chat.openai.com/" role="button" aria-expanded="false">Reportes</a>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="https://chat.openai.com/">Errores</a></li>
          <li><a className="dropdown-item" href="https://chat.openai.com/">Tabla de simbolos</a></li>
        </ul>
      </li>

      </ul>

      <header className="App-header">

        <div className='editores'>

          <div className='containerE'>
            <div className="editor1">
              <h4>Entrada</h4>
              <MonacoEditor
                width="700"
                height="600"
                language="javascript"
                theme="vs-light"
                value={code}
                options={{ minimap: { enabled: false } }}
                onChange={setCode}
              />
            </div>
            <div className="editor2">
              <h4>Consola</h4>
              <MonacoEditor
                width="700"
                height="600"
                language="javascript"
                theme="vs-light"
                value={resultado}
                options={{ readOnly: true }}
              />
            </div>
          </div>
        
          <div className="d-flex justify-content-around mt-4">
            <Button variant="primary" className="boton" class="btn btn-light" onClick={()=>{analizar()} }>Analizar</Button>
            <Button variant="primary" className="boton" class="btn btn-light" onClick={()=>{graficar_AST()} }>Generar AST</Button>
          </div>

        </div>

      </header>

    </div>
  );
}

export default App;