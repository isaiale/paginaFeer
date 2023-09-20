import React, { useEffect, useState } from "react";
import "../css/navbar.css"
import "../css/colores.css"
import { Link } from "react-router-dom";
import { urlInfoEmpresa } from "../url";
import axios from "axios";


const Navbar = () => {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        getInformacion();
    }, []);

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
                                <Link className="nav-link fs-5" to="/">Inicio</Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link fs-5" to="/productos">Productos</Link>
                            </li>
                        </ul>
                        <Link className="btn " style={{background: '#0aad0a', color:'white'}} to="/iniciarSecion">Login</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;

/*<nav className="navbar navbar-expand-sm bg-dark fixed-top">
            <ul className="navbar-nav me-auto mb-lg-0">
                <Link className="navbar-brand text-white ms-5" to="/inicio">Inicio</Link>
                <Link className="navbar-brand text-white" to="/registro">Registro</Link>
            </ul>
            <div>
                <Link className="btn btn-outline-danger me-5" to="/login">Salir</Link>
            </div>
        </nav>*/
