import React from 'react';
import Navbar from '../componentes/navbarUser';
import { Productos } from '../componentes/productos';
import Footer from '../componentes/footer';

export const productos = () => {
  return (
    <div>
        <Navbar/>
        <Productos/>
        <Footer/>
    </div>
  )
}
