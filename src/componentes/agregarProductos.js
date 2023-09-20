import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { show_alerta } from "./funciones";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from '../autenticación/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { urlProductos, urlCloudinary, urlCategoria } from "../url";

const AgregarProducto = () => {
  const [products, setProducts] = useState([]);
  const [categoriaa, setCategoriaa] = useState([]);
  const [idProducto, setIdProducto] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [existencia, setExistencia] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [titulo, setTitle] = useState("");
  const [operacion, setOpcion] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);

  const [nombreCategoria, setNombreCategoria] = useState('');
  const [idCategoria, setIdCategoria] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const history = useNavigate();


  useEffect(() => {
    getProducts();
    setTotalProducts(products.length);
  }, [products]);

  useEffect(() => {
    getCategoria();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      history('/');
    }
  }, [isAuthenticated]);

  const getProducts = async () => {
    const MySwal = withReactContent(Swal);
    try {
      const response = await axios.get(urlProductos);
      setProducts(response.data);
    } catch (error) {
      show_alerta("Error al obtener productos", "error");
      console.log(error);
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      const response = await axios.post(urlCloudinary, data);
      const imageUrl = response.data.secure_url;
      setImagen(imageUrl);
    } catch (error) {
      show_alerta('Error al cargar la imagen', 'error');
      console.error(error);
    }
  };


  const openModal = (op, product) => {
    setIdProducto("");
    setNombre("");
    setDescripcion("");
    setCategoria("");
    setExistencia("");
    setPrecio("");
    setImagen("");
    setOpcion(op);
    if (op === 1) {
      setTitle("Agregar Producto");
    } else if (op === 2 && product) {
      setTitle("Editar Producto");
      setIdProducto(product._id);
      setNombre(product.nombre);
      setDescripcion(product.descripcion);
      setCategoria(product.categoria);
      setExistencia(product.existencia);
      setPrecio(product.precio);
      setImagen(product.imagen);
    }

    window.setTimeout(function () {
      document.getElementById("nombre").focus();
    }, 500);
  };

  const validate = () => {
    if (!nombre || !descripcion || !categoria || !existencia || !precio || !imagen) {
      show_alerta("Completa todos los campos", "warning");
      return;
    }

    var productData;
    productData = {
      nombre: nombre,
      descripcion: descripcion,
      categoria: categoria,
      existencia: existencia,
      precio: precio,
      imagen: imagen
    };
    var metodo;

    if (operacion === 1) {
      addProduct(productData);
    } else {
      metodo = 'PUT';
      updateProduct(metodo, productData, idProducto);
    }
  };

  const addProduct = async (productData) => {
    const MySwal = withReactContent(Swal);
    try {
      await axios.post(urlProductos, productData);
      MySwal.fire({
        title: "Producto añadido con éxito",
        icon: "success",
      })
      document.getElementById("btncerrar").click();
      getProducts();
    } catch (error) {
      show_alerta("Error al agregar producto", "error");
      console.log(error);
    }
  }

  const updateProduct = async (metodo, productData, idProducto) => {
    const MySwal = withReactContent(Swal);
    await axios({ method: metodo, url: urlProductos + '/' + idProducto, data: productData })
      .then(function (response) {
        MySwal.fire({
          title: "Producto actualizado con éxito",
          icon: "success",
        })
        document.getElementById("btncerrar").click();
        getProducts();
      }).catch(function (error) {
        show_alerta("Error al actualizar producto", "error");
        console.log(error);
      })
  }

  const deleteProduct = (_id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Está seguro de que desea eliminar este producto?",
      icon: "question",
      text: "Esta acción no se puede deshacer.",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({ method: 'DELETE', url: urlProductos + '/' + _id })
          .then(function (response) {
            show_alerta('Se eliminó correctamente', 'success');
            getProducts();
          }).catch(function (error) {
            show_alerta('error en la solicitud', 'error');
            console.log(error);
          })
      } else {
        show_alerta('No se eliminó', 'info');
      }
    });
  };
  //#############################################################################################
  const getCategoria = async () => {
    const respuest = await axios.get(urlCategoria);
    setCategoriaa(respuest.data);
  }

  const openModalCategoria = (op, cate) => {
    setIdCategoria("");
    setNombreCategoria("");
    setOpcion(op);
    if (op === 1) {
      setTitle("Agregar Categoria");
    } else if (op === 2 && cate) {
      setTitle("Editar Categoria");
      setIdCategoria(cate._id);
      setNombreCategoria(cate.nombre);
    }

    window.setTimeout(function () {
      document.getElementById("nombre").focus();
    }, 500);
  };

  const validateCategoria = () => {
    if (!nombreCategoria) {
      show_alerta("Completa todos los campos", "warning");
      return;
    }

    var productData;
    productData = {
      nombre: nombreCategoria
    };
    var metodo;

    if (operacion === 1) {
      addCategoria(productData);
    } else {
      metodo = 'PUT';
      updateCategoria(metodo, productData, idCategoria);
    }
  };

  const addCategoria = async (productData) => {
    const MySwal = withReactContent(Swal);
    try {
      await axios.post(urlCategoria, productData);
      MySwal.fire({
        title: "Categoria añadido con éxito",
        icon: "success",
      })
      document.getElementById("btnCerrar").click();
      getCategoria();
    } catch (error) {
      show_alerta("Error al agregar Categoria", "error");
      console.log(error);
    }
  }

  const updateCategoria = async (metodo, productData, idCategoria) => {
    const MySwal = withReactContent(Swal);
    await axios({ method: metodo, url: urlCategoria + '/' + idCategoria, data: productData })
      .then(function (response) {
        MySwal.fire({
          title: "Categoria actualizado con éxito",
          icon: "success",
        })
        document.getElementById("btnCerrar").click();
        getCategoria();
      }).catch(function (error) {
        show_alerta("Error al actualizar Categoria", "error");
        console.log(error);
      })
  }

  const deleteCategoria = (_id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Está seguro de que desea eliminar esta Categoria?",
      icon: "question",
      text: "Esta acción no se puede deshacer.",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios({ method: 'DELETE', url: urlCategoria + '/' + _id })
          .then(function (response) {
            show_alerta('Se eliminó correctamente', 'success');
            getCategoria();
          }).catch(function (error) {
            show_alerta('error en la solicitud', 'error');
            console.log(error);
          })
      } else {
        show_alerta('No se eliminó', 'info');
      }
    });
  };

  return (
    <div>
      <div className="App">
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="row mb-4">
              <div className="col-md-4 offset-md-4">
                <div className="">
                  <h5 className="text-center fs-5">Gestión de productos</h5>
                  <button className="btn m-2 fs-5">Total: {totalProducts}</button>
                  <button onClick={() => openModal(1)} className="btn btn-danger m-2" data-bs-toggle="modal" data-bs-target="#modalProducts">
                    Agregar Producto
                  </button>
                  <button className="btn btn-info m-2" data-bs-toggle="modal" data-bs-target="#modalCategorias">
                    Categorías
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-10 col-lg-12 offset-0 offset-lg-0">
              <div className="table-responsive">
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Categoría</th>
                      <th>Existencia</th>
                      <th>Precio</th>
                      <th>Imagen</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, i) => (
                      <tr key={product._id}>
                        <td>{i + 1}</td>
                        <td>{product.nombre}</td>
                        <td>{product.descripcion}</td>
                        <td>{product.categoria}</td>
                        <td>{product.existencia}</td>
                        <td>${product.precio}</td>
                        <td>
                          <img src={product.imagen} className="img-thumbnail" alt="Product" style={{ maxWidth: "100px" }} />
                        </td>
                        <td>
                          <button onClick={() => openModal(2, product)} className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducts">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          &nbsp;
                          <button onClick={() => deleteProduct(product._id)} className="btn btn-danger">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div id="modalProducts" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{titulo}</h5>
                <button type="button" className="btn-close" id="btncerrar" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <select id='categoria' className='form-control' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value=''>Selecciona una categoría</option>
                    {categoriaa.map((cat) => (
                      <option key={cat._id} value={cat.nombre}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>

                </div>
                <div className="mb-3">
                  <label className="form-label">Existencia</label>
                  <input type="number" className="form-control" id="existencia" value={existencia} onChange={(e) => setExistencia(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Precio</label>
                  <input type="number" className="form-control" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Imagen</label>
                  {imagen && <img src={imagen} alt="imagen" className="img-thumbnail mb-3" style={{ maxWidth: "100px" }} />}
                  <input type="file" className="form-control" onChange={(e) => uploadImage(e)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={validate}>Guardar</button>
              </div>
            </div>
          </div>
        </div>

        <div id="modalCategorias" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Categorias</h5>
                <button type="button" className="btn-close" id="btncerrar" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="col-md-6 offset-md-1">
                    <button onClick={() => openModalCategoria(1)} className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalCategoria">
                      Agregar Categorías
                    </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered mt-3">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>Categorias</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoriaa.map((cate, i) => (
                        <tr key={cate._id}>
                          <td>{i + 1}</td>
                          <td>{cate.nombre}</td>
                          <td>
                            <button className="btn btn-warning" onClick={() => openModalCategoria(2, cate)} data-bs-toggle="modal" data-bs-target="#modalCategoria">
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            &nbsp;
                            <button className="btn btn-danger" onClick={() => deleteCategoria(cate._id)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>

        <div id="modalCategoria" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{titulo}</h5>
                <button type="button" className="btn-close" id="btnCerrar" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="nombre" placeholder="Introduce la categoria" value={nombreCategoria} onChange={(e) => setNombreCategoria(e.target.value)} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={validateCategoria}>Guardar</button>
              </div>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default AgregarProducto;
