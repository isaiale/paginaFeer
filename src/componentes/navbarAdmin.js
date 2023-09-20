import React, { useContext, useEffect, useState } from "react";
import "../css/navbar.css"
import "../css/colores.css"
import { Link } from "react-router-dom";
import { urlInfoEmpresa } from "../url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../autenticación/AuthProvider";

const NavbarAdmin = () => {
    const [info, setInfo] = useState([]);
    const history = useNavigate();
    const { isAuthenticated, logout, user } = useContext(AuthContext);

    const Salir = () => {
        logout();
        history('/');
    }

    useEffect(() => {
        getInformacion();
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            history('/');
        }
    }, [isAuthenticated]);

    const getInformacion = async () => {
        const res = await axios.get(urlInfoEmpresa);
        setInfo(res.data);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary-400">
                <div className="container">
                    {info.map((img, i) => (
                        <a className="navbar-brand " href="#" key={i}>
                            <img src={img.logo} width="50" height="50" className="rounded-circle me-2" />
                            {img.nombre}
                        </a>
                    ))}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end me-3" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item me-3">
                                <Link className="nav-link fs-5" to="/inicioAdmin">Inicio</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link fs-5" to="/agregarProductos">Agregar Producto</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link fs-5" to="/actualizarInfoEmpresa">Informacion</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link fs-5" to="/agregarRedes">Redes</Link>
                            </li>
                        </ul>
                        {isAuthenticated !== null ? (
                            isAuthenticated ? (
                                <>
                                <div className="btn text-white fs-4 ms-3 me-2">{user.nombre}</div>
                                <Link className="btn btn-success text-100" to="/">Cerrar seción</Link>
                                </>
                            ) : (
                                <Link className="btn btn-success text-100" to="/">Cerrar seción</Link>
                            )
                        ) : null}
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default NavbarAdmin;
