import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseCfg from '../firebase';
import '../css/login.css';
import { Link} from 'react-router-dom';
import { Redirect } from 'react-router';


const firebaseApp = firebase.initializeApp(firebaseCfg);

class Login extends Component{ 

    state = {
        redirect: false,
        destino: ''
    }

    email = React.createRef();
    password = React.createRef();

    iniciarSesion(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ redirect: true, destino: '/login' });
        })
        .catch(() => {
            alert('Debe introducir los credenciales correctos');
        })
    }

    render(){
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={this.state['destino']}/>;
        }
        const {
            user,
            signOut,
            signInWithGoogle,
            signInWithTwitter,
            signInWithGithub,
        } = this.props;  

        

        return(
            <div id="login_card">
                <h1 className="text-center text-primary">Inicia Sesion</h1>
                
                <label htmlFor="email" className=""><i className="fas fa-envelope"></i> E-Mail: </label><br/>
                <input id="email" type="email" ref={this.email} className="form-control"></input><br/>

                <label htmlFor="email"><i className="fas fa-key"></i> Contraseña: </label><br/>
                <input id="pass" type="password" ref={this.password} className="form-control"></input><br/>

                <button id="login" onClick={() => this.iniciarSesion(this.email.current.value, this.password.current.value)} className="form-control btn btn-success">Login <i className="fas fa-sign-in-alt"></i></button><br/>

                <label>También puede iniciar sesión con:</label><br/>
                <div className="d-flex justify-content-around w-25 m-auto">
                {
                !user
                    ? <span id="googleLogin" onClick={signInWithGoogle}>
                        <i className="fab fa-google fa-3x text-danger"></i>
                    </span>
                    : ''
                }
                {
                !user
                    ? <span id="twitterLogin" onClick={signInWithTwitter}>
                        <i className="fab fa-twitter fa-3x text-primary"></i>
                    </span>
                    : ''
                }
                {
                !user
                    ? <span id="githubLogin" onClick={signInWithGithub}>
                        <i className="fab fa-github fa-3x"></i>
                    </span>
                    : ''
                }
                {
                !user
                    ? <span id="phoneLogin" onClick={() => this.setState({redirect: true, destino: '/phoneLogin'})}>
                        <i className="fas fa-phone fa-3x text-success"></i>
                    </span> 
                    : ''
                }
                {
                    user ?
                    <button onClick={signOut}>Sign Out</button>:
                    ''
                }
                </div>

                <br/>
                <label>Si aún no dispone de una cuenta:</label><br/>
                <Link to="/newUser"> 
                    <button className="btn btn-warning"><i className="fas fa-user"></i> Crear Cuenta</button>
                </Link>
                
            </div>
        );
    }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  twitterProvider: new firebase.auth.TwitterAuthProvider(),
  githubProvider: new firebase.auth.GithubAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Login);