import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../componentes/funciones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { urlRedes } from "../url";
//import { AuthContext } from '../autenticación/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

const AgregarRedes = () => {
    const [red, setRed] = useState([]);
    const [id, setId] = useState('');
    const [tipo, setTipo] = useState('');
    const [enlace, setEnlace] = useState('');
    const [operacion, setOperacion] = useState(1);
    const [title, setTitle] = useState('');
    const MySwal = withReactContent(Swal);
    //const { isAuthenticated } = useContext(AuthContext);
    const history = useNavigate();

    useEffect(() => {
        getRedSocial();
    }, []);
    /*useEffect(() => {
        if (!isAuthenticated) {
            history('/');
        }
    }, [isAuthenticated]);*/

    const getRedSocial = async () => {
        const respuest = await axios.get(urlRedes);
        setRed(respuest.data);
    }
    const openModal = (op, idRedes, tipo, enlace) => {
        setId('');
        setTipo('');
        setEnlace('');
        setOperacion(op);
        if (op === 1) {
            setTitle('Registrar Red Social');
        }
        else if (op === 2) {
            setTitle('Editar Red Social');
            setId(idRedes);
            setTipo(tipo);
            setEnlace(enlace);
        }
        window.setTimeout(function () {
            document.getElementById('tipo').focus();
        }, 500);
    }
    const validar = () => {
        var parametros;
        var metodo;
        if (tipo === '') {
            MySwal.fire({
                title: "Selecciona el tipo de red social",
                icon: "warning",
              })
        }
        else if (enlace === '') {
            MySwal.fire({
                title: "Ingresa el Link de tu Red Social",
                icon: "warning",
              })
        } else {
            parametros = {
                tipo: tipo,
                enlace: enlace
            };

            if (operacion === 1) {
                enviarSolicitudGuardar(parametros);
            } else {
                enviarSolicitudEditar(parametros, id);
            }
        }
    }
    const enviarSolicitudGuardar = async (parametros) => {
        await axios.post(urlRedes,parametros)
            .then(function (respuesta) {
                MySwal.fire({
                    title: "Se Agrego correctamente",
                    icon: "success",
                  })
                document.getElementById('btncerrar').click();
                getRedSocial();

            }).catch(function (error) {
                MySwal.fire({
                    title: "Error en la solicitud",
                    icon: "error",
                  })
                console.log(error);
            })
    }
    const enviarSolicitudEditar = async (parametros, idRedes) => {
        await axios.put(urlRedes+'/'+idRedes, parametros)
            .then(function (respuesta) {
                MySwal.fire({
                    title: "Se actualizo correctamente",
                    icon: "success",
                  })
                document.getElementById('btncerrar').click();
                getRedSocial();
            }).catch(function (error) {
                show_alerta('Error en la solicitud', 'error');
                console.log(error);
            })
    }

    const deleteProduct = (idRedes, tipo) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: 'Seguro que quiere eliminar esta Red ' + tipo + '?',
            icon: 'question', text: 'No se podra dar marcha atras',
            showCancelButton: true, confirmButtonText: 'Si, eliminar', cancelButtonText: 'Cancelar'
        }).then((result) => {
            if ((result.isConfirmed)) {
                axios.delete(urlRedes+'/'+idRedes)
                    .then(function (respuesta) {
                        MySwal.fire({
                            title: "Se elimino correctamente",
                            icon: "success",
                          })
                        getRedSocial();
                    }).catch(function (error) {
                        show_alerta('Error en la solicitud', 'error');
                        console.log(error);
                    })
            } else {
                MySwal.fire({
                    title: "La Red Social NO fue eliminado",
                    icon: "info",
                  })
            }
        })
    }

    return (
        <div>
            <div className='App'>
                <div className='container-fluid'>
                    <div className="row mt-5">
                        <div className='row mt-5 mb-4'>
                            <div className='col-md-4 offset-md-4'>
                                <div className='d-grid mx-auto'>
                                    <h5 className='text-center fs-5'>Agregar red social</h5>
                                    <button onClick={() => openModal(1)} className='btn btn-success' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Tipo</th>
                                            <th>Enlace</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {red.map(({ _id, tipo, enlace }, i) => (
                                            <tr key={_id}>
                                                <td>{i+1}</td>
                                                <td>{tipo}</td>
                                                <td>{enlace}</td>
                                                <td>
                                                    <button onClick={() => openModal(2, _id, tipo, enlace)}
                                                        className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                    &nbsp; {/* Sirve para dar un espacio*/}
                                                    <button onClick={() => deleteProduct(_id, tipo)} className='btn btn-danger'>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='modalProducts' className='modal fade'>
                    <div className='modal-dialog'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <label className='h5'>{title}</label>
                                <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                            </div>
                            <div className='modal-body'>
                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                    <select id='tipo' className='form-control' value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                        <option value=''>Selecciona una red social</option>
                                        <option value='facebook'>Facebook</option>
                                        <option value='whatsapp'>WhatsApp</option>
                                        <option value='instagram'>Instagram</option>
                                        <option value='twitter'>Twitter</option>
                                        <option value='linkedin'>LinkedIn</option>
                                        <option value='youtube'>YouTube</option>
                                        <option value='tikTok'>TikTok</option>
                                        <option value='pinterest'>Pinterest</option>
                                        <option value='reddit'>Reddit</option>
                                    </select>
                                </div>

                                <div className='input-group mb-3'>
                                    <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                    <input type='text' id='enlace' className='form-control' placeholder='Enlace de tu Red Social' value={enlace}
                                        onChange={(e) => setEnlace(e.target.value)}></input>
                                </div>
                                <div className='d-grid col-6 mx-auto'>
                                    <button onClick={() => validar()} className='btn btn-success'>
                                        Guardar
                                    </button>
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button id='btncerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default AgregarRedes;