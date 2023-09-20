import React,{useEffect,useState} from "react";
import Navbar from './navbarUser';
import axios from "axios";
import {show_alerta} from "./funciones";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Registro = () => {
    const url = "http://localhost:9000/api/users";
    const [user, setUser] = useState([]);
    const [id, setId]= useState('');
    const [nombre, setNombre]= useState('');
    const [correo, setCorreo]=useState('');
    const [contraseña,setContraseña]=useState('');
    const [opcion,setOpcion]=useState('');
    const [titulo,setTitulo]=useState('');

    useEffect(()=>{
        getUser();
    },[]);

    const getUser = async ()=>{
        const res = await axios.get(url);
        setUser(res.data);
    }

    const validar = ()=>{
        var parametros;
        var metodo;
        if(!nombre || !contraseña||!correo){
            show_alerta('Completa todos los campos','warning');
            return;
        }
        if(!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(contraseña)){
            show_alerta('La contraseña debe de tener al menos 8 caracteres, una letra mayuscula, una letra minuscula y un numero','warning');
            return;
        }
        if(!/\S+@\S+\.\S+/.test(correo)){
            show_alerta('Ingresa un correo valido','warning');
            return;
        }
        if(!/^[a-zA-Z]+$/.test(nombre)){
            show_alerta('El nombre solo debe tener letras','warning');  
            return;
        }   
        parametros ={nombre:nombre,contraseña:contraseña,correo:correo};
        if(opcion===1){
            metodo='POST';
            guardar(metodo,parametros);
        }else{
            metodo='PUT';
            editar(metodo,parametros,id);
        }
    }

    const guardar =async(metodo,parametros)=>{
        await axios({method:metodo, url:url,data:parametros})
        .then(function(response){
            show_alerta("Guardado","success");
            document.getElementById('btncerrar').click();
            getUser();
        }).catch(function(error){
            show_alerta("error al Guardar","error");
            console.log(error);
        })
    }

    const editar = async (metodo,parametros,id)=>{
        await axios({method:metodo,url:url+'/'+id,data:parametros})
        .then(function (response) {
            show_alerta("Acualizado","success");
            document.getElementById('btncerrar').click();
            getUser();
          }).catch(function(error){
            show_alerta("error","error");
            console.log(error);
          })
    }

    const openModal = (op,id,nombre,contraseña,correo)=>{
        setId('');
        setNombre('');
        setContraseña('');
        setCorreo('');
        setOpcion(op);
        if(op===1){
            setTitulo('Registrar');
        }else if(op===2){
            setTitulo('Editar');
            setId(id);
            setNombre(nombre);
            setContraseña(contraseña);
            setCorreo(correo);
        }
        window.setTimeout(function(){
            document.getElementById('nombre').focus();
        },500);
    }

    const eliminar =(id,nombre)=>{
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title:'¿desea eliminar a '+nombre+'?',
            icon:'question',
            showCancelButton:true,
            confirmButtonText:'Eliminar',
            cancelButtonText:'Cancelar'
        }).then((result)=>{
            if(result.isConfirmed) {
                axios({method:'DELETE', url:url+'/'+id})
                .then(function (response){
                    show_alerta('Se eliminó correctamente','success');
                    getUser();
                }).catch(function (error){
                    show_alerta('error en la solicitud','error');
                    console.log(error);
                })
            }else{
                show_alerta('No se eliminó','info');
            }
        });
    }

    return (
        <div>
            <Navbar/>
            <div className="container-fluid">
                <div className="row mt-4">
                    <div className="row mt-5 mb-4">
                    <div className="col-md-3 offset-md-4">
                        <div className="d-grid mx-auto">
                            <button className="btn btn-primary" onClick={()=>openModal(1)} data-bs-toggle='modal' data-bs-target='#modalUser'>Agregar</button>
                        </div>
                    </div>
                </div>
                </div>
                
            </div>
            <div className="row mt-3">
                <div className="col-10 col-lg-6 offset-0 offset-lg-3">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Nombre</th>
                                    <th>Contraseña</th>
                                    <th>Correo</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {user.map(({_id,nombre,contraseña,correo},i)=>(
                                    <tr key={_id}>
                                    <td>{i+1}</td>
                                    <td>{nombre}</td>
                                    <td>{contraseña}</td>
                                    <td>{correo}</td>
                                    <td>
                                       <button className="btn btn-primary" onClick={()=>openModal(2,_id,nombre,contraseña,correo)} data-bs-toggle='modal' data-bs-target='#modalUser'>Editar</button> 
                                       &nbsp;
                                       <button className="btn btn-danger" onClick={()=>eliminar(_id,nombre)}>Eliminar</button>
                                    </td>
                                </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modalUser">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label>{titulo}</label>
                            <button className="btn-close" data-bs-dismiss='modal' aria-label='Close' type="button"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <input className="form-control" id="nombre" type="text" placeholder="Nombre" value={nombre} onChange={(e) =>setNombre(e.target.value)}/>
                            </div>
                            <div className="input-group mb-3">
                                <input className="form-control" id="contraseña" type="password" placeholder="Contraseña" value={contraseña} onChange={(e)=>setContraseña(e.target.value)}/>
                            </div>
                            <div className="input-group mb-3">
                                <input className="form-control" id="correo" type="email" placeholder="Correo" value={correo} onChange={(e)=>setCorreo(e.target.value)}/>
                            </div>
                            <div className="d-grid col-6 mx-auto">
                                <button className="btn btn-info" onClick={()=>validar()}>Guardar</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-bs-dismiss='modal' id="btncerrar">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Registro;