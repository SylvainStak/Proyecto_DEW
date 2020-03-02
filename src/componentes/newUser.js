import React, {Component} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router';
import { Link} from 'react-router-dom';
import '../css/login.css';

class newUser extends Component{

    state = {
        redirect: false
    }

    email = React.createRef();
    password = React.createRef();

    creaUsuario(email, password){

        let msg = '';

        if(!document.getElementById('email').validity.valid){
            msg += '* Debe introducir un E-mail válido\n';
        }

        if(password.length < 6){
            msg += '* Debe introducir una contraseña de 6 caracteres como mínimo\n'
        }       

        if(document.getElementById('email').validity.valid && password.length >= 6){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ redirect: true });
                firebase.auth().loginWithEmailAndPassword(email, password)
            })
            .catch(err => {
                
            });
        }else{
            alert(msg);
        }
    }

    render(){
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/mostrador'/>;
        }
        
        return(
            <React.Fragment>
                <h1 className="text-center text-primary">Nuevo Usuario</h1>
                <div id="createUserDiv">
                    <Link to="/login"> 
                    <button className="btn btn-warning my-3"><i className="fas fa-arrow-left"></i> Ir al Login</button>
                    </Link><br/>
                    <form onSubmit={(e) => e.preventDefault()}>
                    <label><i className="fas fa-envelope"></i> E-mail:</label><br/>
                    <input id="email" type="email" ref={this.email} required></input><br/>
                    <label className="mt-3"><i className="fas fa-key"></i> Contraseña:</label><br/>
                    <input id="password" type="password"  ref={this.password} required></input><br/>


                    <button
                        type="submit" className="btn btn-success mt-5 w-100"
                        onClick={() => this.creaUsuario(this.email.current.value, this.password.current.value)}
                    >
                        Crear cuenta
                    </button>
                    </form>

                </div>
            </React.Fragment>
        );
    }
}


export default newUser;