import React, {Component} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Redirect } from 'react-router';
import { Link} from 'react-router-dom';
import '../css/login.css';

class phoneLogin extends Component{
    state = {
        redirect: false
    }

    phoneNumber = React.createRef();
    verificationCode = React.createRef();
    coderesult = '';

    componentDidMount(){
        this.captchaRender();
        document.getElementById('confirmarCodigo').disabled = true;
    }

    captchaRender(){
        window.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'normal'
        });
        window.recaptchaVerifier.render();
    }

    phoneAuth(){
        let number = `+34${this.phoneNumber.current.value}`;
        
        firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier)
        .then(confirmationResult => {
          window.confirmationResult = confirmationResult;
          this.coderesult = confirmationResult;
          document.getElementById('mensaje').innerHTML = 'Se le ha enviado un código de verificación al número de teléfono marcado. Introduzcalo en la caja de texto a continuación:';
          document.getElementById('confirmarCodigo').disabled = false;
        })
        .catch(error => {
          alert('Ha habido algun error al enviar el codigo de verificacion al numero marcado');
        });
      }
      
      
      codeVerify(){
        let code = this.verificationCode.current.value;
      
        this.coderesult.confirm(code)
        .then(result => {
          this.setState({redirect: true});
        }).catch(err => {
          alert('codigo incorrecto');          
        });
      }

    render(){
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/login'/>;
        }
        return(
            <React.Fragment>
                <h1 className="text-primary text-center">Login por Teléfono</h1>

            <div id="phone_card">
                <Link to="/login"> 
                    <button className="btn btn-warning my-3"><i className="fas fa-arrow-left"></i> Ir al Login</button>
                </Link><br/>
                <input id="phoneNumber" ref={this.phoneNumber} type="text" className="form-control align-self-center py-4 ml-2" placeholder="608054085"/>
                <span className="text-warning">Asegúrate de pasar el captcha para que te podamos enviar el SMS</span>

              <div className="d-flex justify-content-around mt-2">
                <div id="recaptcha-container"></div>
                <button id="enviarSMS" onClick={() => this.phoneAuth()} className="btn btn-success">Enviar SMS</button>
              </div>

              <p id="mensaje" className="text-warning font-weight-bold mt-5"></p>
              
              <hr className="mt-5"/>

              <h5 className="mt-3"><i className="fa fa-asterisk" aria-hidden="true"></i>
                 <span className="text-primary">Código de Verificación:</span></h5>

              <div className="row">
                <div className="col-7">
                  <input type="text" id="verificationCode" ref={this.verificationCode} className="form-control" data-placement="top" data-trigger="manual" data-toggle="popover" title="Codigo incorrecto" data-content="El codigo introducido es incorrecto, compruebelo o vuelva a enviar un SMS con el codigo de verificacion"/>
                </div>
                <div className="col-5">
                  <button id="confirmarCodigo" onClick={() => this.codeVerify()}  className="btn btn-primary float-right">Confirmar Código</button>
                </div>
              </div>              
          </div>

            </React.Fragment>
        );
    }
}

export default phoneLogin;