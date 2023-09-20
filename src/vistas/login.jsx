import React from 'react';
import Navbar from '../componentes/navbarUser';
import Login from '../componentes/login';
import Footer from '../componentes/footer';

export const login = () => {
  return (
    <div>
      <Navbar />
      <Login />
      <Footer/>
    </div>

  )
}
