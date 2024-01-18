import React from 'react';
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
