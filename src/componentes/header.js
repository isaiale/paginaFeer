import React from "react";
import producto from "../img/inicio.png";
import "../css/navbar.css";
import "../css/colores.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>            
            <div className="bg-primary-200 text-text-100 p-3 fadeInColor" style={{ minHeight: '550px' }}>
                <div className="d-flex flex-column-reverse flex-lg-row align-items-lg-center">
                    <div className="w-100">
                        <div className="mt-5">
                            <p className="text-center custom-text">¡Descubre nuestros productos que tenemos a la venta!</p>
                            <div className="text-center mt-3">
                                <Link className="btn" style={{background: '#0aad0a', color:'white'}} to="/productos">Ver productos</Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 text-center">
                        <img src={producto} alt="Imagen de la empresa" className="img-fluid mt-5" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;
