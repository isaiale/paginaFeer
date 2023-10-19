import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from '../img/loginn.png';
import "../css/login.css";
import { urlUsuarios } from "../url";
import { AuthContext } from "../autenticación/AuthProvider";
//import sendWelcomeEmail from "../";
import sendWelcomeEmail from "./servidor";

const Login = () => {
    const histories = useNavigate();
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {login} = useContext(AuthContext);

    const loginUser = (e) => {
        e.preventDefault();
        if (password.length < 2) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres');
            return;
          }
        fetch(urlUsuarios)
            .then(response => response.json())
            .then(data => {
                const user = data.find(u => u.correo === correo && u.contraseña === password);
                if (user) {
                    login(user);    
                    if(user.rol[0].rol==="admin"){
                        
                        //histories('/inicioAdmin');
                        sendWelcomeEmail(
                            user.correo,
                            user.nombre // Pasa el nombre de usuario
                        ).then(() => {
                            histories('/inicioAdmin');
                        });
                    }               
                }else{
                    setErrorMessage('El correo electronico o contraseña son incorrectos')
                }
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Hubo un error al iniciar sesión');
            });
    }

    return (
        <main className="">
            <section className="my-lg-12 my-5">
                <div className="container">
                    <div className="row justify-content-center align-items-center border-3d">
                        <div className="col-12 col-md-6 col-lg-4 order-lg-5 order-5 mb-1">
                            <img src={loginImg} className="img mb-2" />
                        </div>

                        <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-5 order-5">
                            <div className="mb-lg-4 mb-3">
                                <h1 className="mb-1 h2 fw-bold text-center">Login</h1>
                            </div>
                            {errorMessage !== '' && (
                                <label className="text-danger text-center">{errorMessage}</label>
                            )}
                            <form onSubmit={loginUser}>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <input className="form-control" type="email" placeholder="Correo" onChange={(e) => setCorreo(e.target.value)} />
                                    </div>
                                    <div className="col-12">
                                        <div className="password-field position-relative">
                                            <input className="form-control" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="d-grid col-12">
                                        <input className="btn border-3d" style={{background: '#0aad0a', color:'white'}} type="submit" value="Iniciar sesión"></input>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </main>

    )

}

export default Login;