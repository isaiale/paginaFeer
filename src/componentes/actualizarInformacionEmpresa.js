import React, { useEffect, useState } from "react";
import axios from "axios";
import { show_alerta } from "./funciones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from '../autenticación/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { urlCloudinary, urlInfoEmpresa } from "../url";

const ActualizarInformacionEmpresa = () => {
  const [infoEmpresa, setInfoEmpresa] = useState([]);
  const [id, setId] = useState("");
  const [logo, setLogo] = useState("");
  const [nombre, setNombre] = useState("");
  const [sobreNosotros, setSobreNosotros] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [title, setTitle] = useState("");
  const MySwal = withReactContent(Swal);
  //const { isAuthenticated } = useContext(AuthContext);
  //const history = useNavigate();

  useEffect(() => {
    getInfoEmpresa();
  }, []);
  /*
  useEffect(() => {
    if (!isAuthenticated) {
      history('/');
    }
  }, [isAuthenticated]);
  */

  const getInfoEmpresa = async () => {
    try {
      const response = await axios.get(urlInfoEmpresa);
      setInfoEmpresa(response.data);
    } catch (error) {
      show_alerta("Error al obtener productos", "error");
      console.log(error);
    }
  };

  const openModal = (info) => {
    setTitle("Editar información de empresa")
    setId(info._id);
    setLogo(info.logo);
    setNombre(info.nombre);
    setSobreNosotros(info.informacion);
    setDireccion(info.direccion);
    setTelefono(info.telefono);
    setCorreo(info.correo);

    window.setTimeout(function () {
      document.getElementById("nombre").focus();
    }, 500);
  }



  const validar = () => {
    if (!logo || !nombre || !sobreNosotros || !direccion || !telefono || !correo) {
        MySwal.fire({
            title: "Completa todos los campos",
            icon: "warning",
          })
      return;
    }
    else {
      const informacionDeEmpesa = {
        logo: logo,
        nombre: nombre,
        informacion: sobreNosotros,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
      };

      ActualizarInformacionEmpresa(informacionDeEmpesa, id);
    }
  };

  const ActualizarInformacionEmpresa = async (informacionDeEmpesa, idEmpresa) => {
    try {
      await axios.put(urlInfoEmpresa+'/'+idEmpresa, informacionDeEmpesa);
      MySwal.fire({
        title: "informacion actualizada con éxito",
        icon: "success",
      })
      document.getElementById("btncerrar").click();
      getInfoEmpresa();
    } catch (error) {
        MySwal.fire({
            title: "Error al actualizar producto",
            icon: "error",
          })
      console.log(error);
    }
  };

  const uploadLogo = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "uploads");
    try {
      const res = await fetch(urlCloudinary, {
        method: "POST",
        body: data,
      });
      const file = await res.json();
      setLogo(file.secure_url);
    } catch (error) {
      show_alerta("Error al cargar el logo", "error");
      console.log(error);
    }
  };


  return (
    <div>
      <div className="App">
        <div className="container-fluid">
          <div className="row mt-5">
            <div className="row mt-5 mb-4">
              <div className="col-md-4 offset-md-4">
                <div className="d-grid mx-auto">
                  <h5 className="text-center fs-5">Gestión de información de empresa</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-10 col-lg-12 offset-0 offset-lg-0">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>sobreNosotros</th>
                      <th>Dirección</th>
                      <th>Teléfono</th>
                      <th>Correo</th>
                      <th>Logo</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {infoEmpresa.map((info) => (
                      <tr key={info._id}>
                        <td>{info.nombre}</td>
                        <td>{info.informacion}</td>
                        <td>{info.direccion}</td>
                        <td>{info.telefono}</td>
                        <td>{info.correo}</td>
                        <td>{info.logo ? <img src={info.logo} alt='Logo' width='50' height='50' /> : '-'}</td>
                        <td>
                          <button className="btn btn-warning" onClick={() => openModal(info)} data-bs-toggle="modal" data-bs-target="#modalProducts">
                            <FontAwesomeIcon icon={faEdit} />
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
                <label className="h5 ">{title}</label>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="mb-3">
                  <label className="form-label">Logo</label>
                  {logo && <img src={logo} alt="Logo de la empresa" className="img-thumbnail mb-3" style={{ maxWidth: "100px" }} />}
                  <input type="file" onChange={uploadLogo} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Sobre Nosotros</label>
                  <textarea className="form-control" rows="3" value={sobreNosotros} onChange={(e) => setSobreNosotros(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                </div>
                <div className="d-grid col-6 mx-auto">
                  <button className="btn btn-success" onClick={validar}>Guardar </button>
                </div>
              </div>
              <div className="modal-footer">
                <button id="btncerrar" type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualizarInformacionEmpresa;
