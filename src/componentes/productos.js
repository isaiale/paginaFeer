import React, { useState, useEffect, useContext } from 'react';
//import { AuthContext } from '../autenticación/AuthProvider';
//import { show_alerta } from './funciones';
import axios from 'axios';
import { urlProductos } from '../url';
import "../css/colores.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export function Productos() {
    const [products, setProducts] = useState([]);
    const [idProducto, setIdProducto] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [existencia, setExistencia] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [titulo, setTitle] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await axios.get(urlProductos);
        setProducts(response.data);
    };

    const openModal = (product) => {
        setTitle("Detalles de " + product.nombre + '.')
        setIdProducto(product._id);
        setNombre(product.nombre);
        setDescripcion(product.descripcion);
        setCategoria(product.categoria);
        setExistencia(product.existencia);
        setPrecio(product.precio);
        setImagen(product.imagen);

        window.setTimeout(function () {
            document.getElementById("nombre").focus();
        }, 500);
    }

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="">
            <section className='my-lg-1 my-8'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-10 mb-3'>
                            <h3 className='mb-0'>Productos</h3>
                        </div>
                    </div>
                    <div className='row g-4 row-cols-lg-5 row-cols-2 row-cols-md-3 mb-4'>
                        {products.map((product) => (
                            <div className='col'>
                                <div className='card border-3d'>
                                    <div className='card-body'>
                                        <div className='text-center position-relative'>
                                            <div className='position-absolute top-0 start-0'>
                                                <span className='badge bg-success'>En venta</span>
                                            </div>
                                            <a>
                                                <img src={product.imagen} className='mb-3 img' />
                                            </a>
                                        </div>
                                        <h2 className='fs-6 mb-0'>
                                            <a className='text-inherit text-decoration-none '>{product.nombre}</a>
                                        </h2>
                                        <div className='text-small mb-0'>
                                            <a className='text-decoration-none text-muted fs-5'><small>{product.categoria}</small></a>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center mt-2'>
                                            <div>
                                                <span className='text-dark fs-5'>${product.precio}</span>
                                            </div>
                                            <div>
                                                <button className='btn btn-primary btn-sm border-3d' onClick={() => openModal(product)} data-bs-toggle='modal' data-bs-target='#modalProducts'><FontAwesomeIcon icon={faCircleInfo} /> Detalles</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div id='modalProducts' className='modal fade'>
                <div className='modal-dialog modal-lg'>{/**modal-lg**/}
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{titulo}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <div className='container-fluid'>
                                <div className='row'>
                                    <div class="col-md-6">
                                        <img src={imagen} alt="Producto" className='img' />
                                    </div>
                                    <div class="col-md-6">
                                        <div className="card-body">
                                            <div>
                                                <span className="card-title fs-1" id='nombre'>{nombre}</span>
                                            </div>
                                            <div>
                                                <h1 className="fs-4 mb-2" style={{ color: '#0aad0a' }}>{descripcion}</h1>
                                            </div>
                                            <div>
                                                <h1 className="text-dark mb-2 fs-1">${precio}</h1>
                                            </div>
                                            <div className='mb-2'>
                                                <h1 className='text-decoration-none text-muted fs-4'>Existencia: <small style={{ color:'#0aad0a'}}>{existencia}</small></h1>
                                            </div>
                                            <div className='mb-0'>
                                                <h1 className='text-decoration-none text-muted fs-4'>Categoria: <small style={{ color:'#0aad0a'}}>{categoria}</small></h1>
                                            </div>
                                            {/**
                                             <div className="quantity-selector">
                                                <button className='btn btn-danger fs-4 rounded py-1' onClick={handleDecrement}>-</button>
                                                <input type="text" className='col-2 text-center m-1 rounded' value={quantity} readOnly />
                                                <button className='btn btn-info fs-4 rounded py-1' onClick={handleIncrement}>+</button>
                                            </div>
                                             */}

                                        </div></div>
                                </div>
                            </div>
                            {/**
                             <div className='d-grid col-6 mx-auto'>
                                <button className='btn btn-success mt-3'>
                                    Ordenar
                                </button>
                            </div>
                             */}

                        </div>
                        <div className='modal-footer'>
                            <button id='btncerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

