/**
 * import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { inicioUser } from './vistas/inicioUser';
import { login } from './vistas/login';
import { inicioAdmin } from './vistas/inicioAdmin';
import { agregarRedes } from './vistas/agregarRedes';
import { agregarProductos } from './vistas/agregarProductos';
import { actualizarInfoEmpresa } from './vistas/actualizarInfoEmpresa';
import { productos } from './vistas/productos';
import { productosAdmin } from './vistas/productosAdmin';
import { AuthContextProvider } from './autenticación/AuthProvider';

import { Prueba } from './componentes/prueba';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={inicioUser}></Route>
            <Route path='iniciarSecion' Component={login}></Route>
            <Route path='inicioAdmin' Component={inicioAdmin}></Route>
            <Route path='agregarRedes' Component={agregarRedes}></Route>
            <Route path='agregarProductos' Component={agregarProductos}></Route>
            <Route path='actualizarInfoEmpresa' Component={actualizarInfoEmpresa}></Route>
            <Route path='productos' Component={productos}></Route>
            <Route path='productosAdmin' Component={productosAdmin}></Route>

            <Route path='pruebas' Component={Prueba}></Route>
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>

    </div>
  );
}

export default App;

 */

import React, { useState } from 'react';

function EscitalaCifrado() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [numRounds, setNumRounds] = useState(6);
  const [isDecryptMode, setIsDecryptMode] = useState(false);

  const transformText = () => {
    const text = inputText.replace(/\s/g, ''); // Eliminar espacios en blanco
    const numRows = Math.ceil(text.length / numRounds);
    const matrix = Array.from({ length: numRows }, () => Array(numRounds).fill(''));

    if (isDecryptMode) {
      // Descifrado
      const chunkSize = Math.ceil(text.length / numRows);
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numRounds; j++) {
          const index = i + j * numRows;
          if (index < text.length) {
            matrix[i][j] = text[index];
          }
        }
      }
    } else {
      // Cifrado
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numRounds; j++) {
          const index = i * numRounds + j;
          if (index < text.length) {
            matrix[i][j] = text[index];
          }
        }
      }
    }

    const result = matrix.map(row => row.join('')).join('');
    setOutputText(result);
  };

  const toggleMode = () => {
    setIsDecryptMode(!isDecryptMode);
  };

  return (
    <div className="container mt-4 border">
      <h1 className="text-center">CIFRADO ESCITALA</h1>
      <div className="form-group">
        <label htmlFor="inputText" className='fs-4'>Texto</label>
        <textarea
          className="form-control"
          id="inputText"
          rows="4"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="numRounds" className='fs-4'>Cantidad de Vueltas</label>
        <input
          type="number"
          className="form-control"
          id="numRounds"
          value={numRounds}
          onChange={(e) => setNumRounds(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary fs-5"
        onClick={transformText}
      >
        {isDecryptMode ? 'Descifrar Texto' : 'Cifrar Texto'}
      </button>
      <button
        className="btn btn-secondary ml-2 fs-5"
        onClick={toggleMode}
      >
        Cambiar Modo
      </button>
      <h3 className="mt-4 fs-5">Ingrese el Texto {isDecryptMode ? 'Descifrado' : 'Cifrado'}</h3>
      <p>{outputText}</p>
    </div>
  );
}

export default EscitalaCifrado;