import React from 'react'
import Navbar from '../componentes/navbarUser'
import Header from '../componentes/header'
import Footer from '../componentes/footer'
import RegistroUser from '../componentes/pruebasRegistroEmail'

export const inicioUser = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <RegistroUser/>
      <Footer />
    </div>
  )
}
