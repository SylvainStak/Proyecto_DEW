import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseCfg from '../firebase';
import '../css/login.css';

const firebaseApp = firebase.initializeApp(firebaseCfg);

class Login extends Component{ 
     

    showPhoneModal(){        
        console.log('hola');
    }

    render(){
        const {
            user,
            signOut,
            signInWithGoogle,
            signInWithTwitter,
            signInWithGithub,
        } = this.props;  

        

        return(
            <div id="login_card">
                <h3 className="text-center">Inicia Sesion</h3>
                
                <label htmlFor="email" className="">E-Mail: <i className="fas fa-envelope"></i></label><br/>
                <input id="email" type="email" className="form-control"></input><br/>

                <label htmlFor="email">Contraseña: <i className="fas fa-key"></i></label><br/>
                <input id="pass" type="password" className="form-control"></input><br/>

                <button id="login" className="form-control btn btn-success">Login <i className="fas fa-sign-in-alt"></i></button><br/>

                <label>También puede iniciar sesión con:</label><br/>
                <div className="d-flex justify-content-around w-25 m-auto">
                {
                !user
                    ? <span id="googleLogin" onClick={signInWithGithub}>
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
                    user ?
                    <button onClick={signOut}>Sign Out</button>:
                    ''
                }
                
                <span id="phoneLogin" onClick={this.showPhoneModal}>
                    <i className="fas fa-phone fa-3x text-success"></i>
                </span>
                </div>

                <br/>
                <label>Si aún no dispone de una cuenta:</label><br/>
                <button className="btn btn-warning"><i className="fas fa-user"></i> Crear Cuenta</button>
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

//export default Login;