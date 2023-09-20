import React, { useEffect, useState } from 'react';
import { urlRedes, urlInfoEmpresa } from '../url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import "../css/colores.css";
import { FacebookIcon, WhatsappIcon, TwitterIcon, YouTubeIcon, LinkedInIcon, TikTokIcon, PinterestIcon, RedditIcon, InstagramIcon } from '../componentes/iconos';


function Footer() {
  const [redes, setRedes] = useState([]);
    const [infEmpresa, setInfEmpresa] = useState([]);

    useEffect(() => {
        getRedes();
        getInformacionEmpresa();
    }, []);

    const getRedes = async () => {
        const respuesta = await axios.get(urlRedes);
        setRedes(respuesta.data);
    }

    const getInformacionEmpresa = async () => {
        const res = await axios.get(urlInfoEmpresa);
        setInfEmpresa(res.data);
    }

    const getIcon = (tipo) => {
        switch (tipo.toLowerCase()) {
            case "facebook":
                return <FacebookIcon />;
            case "whatsapp":
                return <WhatsappIcon />;
            case "twitter":
                return <TwitterIcon />;
            case "linkedin":
                return <LinkedInIcon />;
            case "youtube":
                return <YouTubeIcon />;
            case "tiktok":
                return <TikTokIcon />;
            case "pinterest":
                return <PinterestIcon />;
            case "instagram":
                return <InstagramIcon />;
            case "reddit":
                return <RedditIcon />;
            default:
                return null;
        }
    };

    return (
        <footer class="">
            <div className='bg-footer text-light'>
                <div class="row justify-content-center me-3">
                    <div class="col-md-4 mt-3">
                        <h5 className='text-center'>Información</h5>
                        {infEmpresa.map((inf, index) => (
                            <p className="ms-5" key={index}>{inf.informacion}</p>
                        ))}
                    </div>

                    <div class="col-md-5 offset-md-1 mt-3">
                        <form>
                            <h5 className='text-center'>Contactos</h5>
                            {infEmpresa.map((inf, index) => (
                                <div key={index}>
                                    <div className="text-center">
                                        <p className=" align-items-center"><FontAwesomeIcon icon={faPhone} className="me-2" />{inf.telefono}</p>
                                        <p className=" align-items-center"><FontAwesomeIcon icon={faEnvelope} className="me-2" />{inf.correo}</p>
                                        <p className=" align-items-center"><FontAwesomeIcon icon={faHome} className="me-2" />{inf.direccion}</p>
                                    </div>
                                </div>
                            ))}
                        </form>
                    </div>
                </div>
            </div>


            <div className='bg-primary-400'>
                <div class="text-light d-flex flex-column flex-sm-row justify-content-between me-5 ms-5  border-top">
                    {infEmpresa.map((inf) => (
                        <p className='m-2' key={inf.nombre}>&copy; 2023 {inf.nombre}, Todos los derechos reservados.</p>
                    ))}
                    <ul class="list-unstyled d-flex me-3 m-2 ">
                        {redes.map((red, index) => (
                            <li class="ms-2" key={index}>
                                <a class="link-body-emphasis bg-light p-0 btn btn-outline-light" href={red.enlace}>
                                    {getIcon(red.tipo)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </footer>
    )
}
export default Footer;
