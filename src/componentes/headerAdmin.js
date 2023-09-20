import React, { useContext, useEffect, useState } from "react";
import producto from "../img/imagen_de_producto-removebg-preview.png"
import "../css/navbar.css"
import "../css/colores.css"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../autenticación/AuthProvider";

const HeaderAdmin = () => {
    const [greeting, setGreeting] = useState("");
    const history = useNavigate();
    const { isAuthenticated, user } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            history('/');
        }
    }, [isAuthenticated]);

    useEffect(() => {
        // Función para obtener la hora actual
        const getHoraActual = () => {
            const date = new Date();
            const hora = date.getHours();
            return hora;
        };

        // Función para establecer el saludo según la hora del día
        const getSaludo = (hora) => {
            if (hora >= 5 && hora < 12) {
                return "¡Buenos días!";
            } else if (hora >= 12 && hora < 18) {
                return "¡Buenas tardes!";
            } else {
                return "¡Buenas noches!";
            }
        };

        const horaActual = getHoraActual();
        const saludo = getSaludo(horaActual);
        setGreeting(saludo);
    }, []);
    return (
        <div>
            <div className="bg-primary-200 text-text-100 p-3 fadeInColor" style={{ minHeight: '550px' }}>
                <div className="d-flex flex-column-reverse flex-lg-row align-items-lg-center">
                    <div className="w-100">
                        <div className="mt-5">
                            <h1 className="text-center custom-text">¡{greeting}!</h1>
                            <h1 className="text-center custom-text">Bienvenido Admin {user.nombre}</h1>
                            <div className="text-center mt-3">
                                <Link className="btn btn-success" to="/productosAdmin">Ver productos</Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 text-center">
                        <img src={producto} alt="Imagen de la empresa" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeaderAdmin;

/*<nav className="navbar navbar-expand-sm bg-dark fixed-top">
            <ul className="navbar-nav me-auto mb-lg-0">
                <Link className="navbar-brand text-white ms-5" to="/inicio">Inicio</Link>
                <Link className="navbar-brand text-white" to="/registro">Registro</Link>
            </ul>
            <div>
                <Link className="btn btn-outline-danger me-5" to="/login">Salir</Link>
            </div>
        </nav>*/
