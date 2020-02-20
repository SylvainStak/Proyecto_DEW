import React, { Component } from 'react';
import '../css/login.css';

class Login extends Component{
    render(){
        return(
            <div id="login_card" className="border border-dark">
                <h3>Inicia Sesion</h3>
                
                <label htmlFor="email">E-Mail: <i class="fas fa-envelope"></i></label><br/>
                <input id="email" type="email" className="form-control"></input><br/>

                <label htmlFor="email">Contraseña: <i class="fas fa-key"></i></label><br/>
                <input id="pass" type="password" className="form-control"></input><br/>

                <button id="login" className="form-control btn btn-success">Login <i class="fas fa-sign-in-alt"></i></button><br/>

                <label>También puede iniciar sesión con:</label><br/>
                <div className="d-flex justify-content-around w-25 m-auto">
                <span id="googleLogin">
                    <i className="fab fa-google fa-3x text-danger"></i>
                </span>
                <span id="twitterLogin">
                    <i className="fab fa-twitter fa-3x text-primary"></i>
                </span>
                <span id="githubLogin">
                    <i className="fab fa-github fa-3x"></i>
                </span>
                <span id="phoneLogin">
                    <i className="fas fa-phone fa-3x text-success"></i>
                </span>
                </div>

                <br/>
                <label>Si aún no dispone de una cuenta:</label><br/>
                <button className="btn btn-warning"><i class="fas fa-user"></i> Crear Cuenta</button>
            </div>
        );
    }
}

export default Login;