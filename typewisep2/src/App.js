import './App.css';
import { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function App() {
  const [code, setCode] = useState('');
  const [resultado, setResultado] = useState('');

  function analizar() {
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

  function graficar_AST() {
    axios.get('http://localhost:5000/CrearAST')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // CREAR ARCHIVO-----------------------------------------------
  const handleUpdate = (event) => { setCode("") }
  //mostrar errores
  function perrors(){
    axios.get('http://localhost:5000/error')
      .then(function (response) {
        console.log(response.data);
        window.open(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // ABRIR ARCHIVO-----------------------------------------------
  const handleChange = (event) => {
    let upload = document.getElementById("upload");
    let fr = new FileReader();
    fr.readAsText(upload.files[0]);

    fr.onload = function () {
      setCode("")
      setCode(fr.result)
    };
  }
  
  const handleSave = (event) => {
    // Crear un objeto Blob con el contenido del archivo
    var valor = window.prompt("Ingrese el nombre del archivo a guardar:");
    const content = code;
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });

    // Crear un enlace para descargar el archivo
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = valor + '.tw';

    // Crear un elemento de entrada de archivo HTML para seleccionar la ubicación de descarga
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';
    input.directory = true;

    // Agregar el enlace y el elemento de entrada al cuerpo del documento HTML
    document.body.appendChild(link);
    document.body.appendChild(input);

    // Simular un clic en el enlace para descargar el archivo
    link.click();

    // Cuando el usuario elija la ubicación de descarga, descarga el archivo
    input.addEventListener('change', () => {
      const directory = input.files[0].webkitRelativePath.split('/')[0];
      link.setAttribute('download', `${directory}/${valor}.tw`);
      link.click();
    });

    // Eliminar el enlace y el elemento de entrada del documento HTML
    document.body.removeChild(link);
    document.body.removeChild(input);

    // Liberar el objeto URL
    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="App">

      <ul className="nav nav-tabs" id="barra_superior">
        <li>
          <h4>&nbsp;&nbsp;TypeWise&nbsp;&nbsp;</h4>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="" role="button" aria-expanded="false">Editor</a>
          <ul className="dropdown-menu">


            <li>
              <a className="dropdown-item" style={{ position: 'relative' }}>
                <Button variant="primary" className="boton" onClick={handleUpdate} style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}>Crear Archivo</Button>
                Crear Archivo
              </a>
            </li>

            <li>
              <a className="dropdown-item" href="" style={{ position: 'relative' }}>
                <input type="file" accept=".tw, .txt" id="upload" onChange={handleChange} style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }} />
                Abrir Archivo
              </a>
            </li>

            <li><a className="dropdown-item"  style={{position:'relative'}}>
              <Button variant="primary" className="boton" onClick={handleSave} style={{position:'absolute', top:0, left:0, opacity:0}}>Guardar Archivo</Button>
              Guardar Archivo              
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="" role="button" aria-expanded="false">Reportes</a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={() => { perrors() }}>Errores</a></li>
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
            <Button variant="primary" className="btn btn-light" class="btn btn-light" onClick={() => { analizar() }}>Analizar</Button>
            <Button variant="primary" className="btn btn-light" class="btn btn-light" onClick={() => { graficar_AST() }}>Generar AST</Button>
          </div>

        </div>

      </header>

    </div>
  );
}

export default App;