import React, { Component } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseCfg from '../firebase';
import { Link} from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import '../css/mostrador.css';



class Mostrador extends Component{
    state = {
        campeones: []
    }

    componentDidMount(){
        let nombres = [];
        let champs = [];

        axios.get('http://ddragon.leagueoflegends.com/cdn/10.4.1/data/es_ES/champion.json')
        .then(res => {
            let result = res.data.data;
            console.log(result);
            let nombres = Object.keys(result);
            nombres.forEach(nombre => {
                champs.push({
                    nombre: nombre,
                    img: result[nombre].image.full
                });
            });
            this.setState({campeones: champs});
        });
    }
    
    

    render(){

        var listaCampeones = this.state.campeones.map((champ, index) => {
            return(<Link key={index} to={{
                pathname: '/personaje',
                state: {
                  nombre: champ.nombre
                }
              }}>
                <div  className="champ bg-light"> 
                    <img src={require(`../../public/champion/${champ.img}`)} alt="img"/>                   
                    <p className="text-center font-weight-bold text-dark">{champ.nombre}</p>                    
                </div></Link>
            );
        });


        return(
            <div>
                <Link to="/login"> 
                <button className="btn btn-danger m-2" onClick={() => {firebase.auth().signOut()}}>Cerrar Sesion</button>
                </Link>
                <h1 className="text-center text-primary">Personajes League of Legends</h1>
                <div id="results">
                   
                </div>
                {listaCampeones} 
            </div>
        );
    }
}

export default Mostrador;