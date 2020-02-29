import React, {Component} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router'

class newUser extends Component{

    state = {
        redirect: false
    }

    email = React.createRef();
    password = React.createRef();

    creaUsuario(email, password){
        if(password.length >= 6){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ redirect: true })
            })
            .catch(err => {
                alert('Ha habido un error');
            });
        }else{
            alert('La contraseña debe tener como minimo 6 caracteres');
        }
    }

    test(){
        console.log(firebase.auth().currentUser);
        console.log(window.location.href);
    }

    render(){
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/login'/>;
        }
        return(
            <React.Fragment>
                <h1>Nuevo Usuario</h1>

                    
                    <input type="email" ref={this.email} placeholder="Correo" required></input>
                    <input type="password" ref={this.password} required></input>


                    <button
                        type="submit"
                        onClick={() => this.creaUsuario(this.email.current.value, this.password.current.value)}
                    >
                        Crear cuenta
                    </button>

                    
                <button onClick={() => this.test()}>Prueba</button>
            </React.Fragment>
        );
    }
}


export default newUser;