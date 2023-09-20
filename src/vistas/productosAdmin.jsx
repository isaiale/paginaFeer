import React from 'react';
import NavbarAdmin from '../componentes/navbarAdmin';
import { Productos } from '../componentes/productos';
import Footer from '../componentes/footer';


export const productosAdmin = () => {
  return (
    <div>
        <NavbarAdmin/>
        <Productos/>
        <Footer/>
    </div>
  )
}
