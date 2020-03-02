import React, { Component } from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import { Link} from 'react-router-dom';

class Personaje extends Component{

    state = {
        nombre: ''
    }

    componentDidMount(){
        const { nombre } = this.props.location.state;
        this.setState({nombre: nombre});

        console.log(this.state);

        axios.get(`http://ddragon.leagueoflegends.com/cdn/10.4.1/data/es_ES/champion/${nombre}.json`)
        .then(res => {
            
            let result = res.data.data[nombre];
            this.setState({img: result.image.full})
            this.setState({cdQ: result.spells[0].cooldown});
            this.setState({cdW: result.spells[1].cooldown});
            this.setState({cdE: result.spells[2].cooldown});
            this.setState({cdR: result.spells[3].cooldown});
            console.log(this.state);
        });
    }

    render(){
        if(this.state.cdQ != undefined &&
           this.state.cdW != undefined &&
           this.state.cdE != undefined &&
           this.state.cdR != undefined){
            let cdQ1 = this.state.cdQ[0];
            let cdQ2 = this.state.cdQ[1];
            let cdQ3 = this.state.cdQ[2];
            let cdQ4 = this.state.cdQ[3];
            let cdQ5 = this.state.cdQ[4];

            let cdW1 = this.state.cdW[0];
            let cdW2 = this.state.cdW[1];
            let cdW3 = this.state.cdW[2];
            let cdW4 = this.state.cdW[3];
            let cdW5 = this.state.cdW[4];

            let cdE1 = this.state.cdE[0];
            let cdE2 = this.state.cdE[1];
            let cdE3 = this.state.cdE[2];
            let cdE4 = this.state.cdE[3];
            let cdE5 = this.state.cdE[4];

            let cdR1 = this.state.cdR[0];
            let cdR2 = this.state.cdR[1];
            let cdR3 = this.state.cdR[2];
            let cdR4 = this.state.cdR[3];
            let cdR5 = this.state.cdR[4];
    
            return(
                <div>
                    <Link to="/mostrador"> 
                        <button className="btn btn-warning my-3"><i className="fas fa-arrow-left"></i> Ir al Mostrador</button>
                    </Link>
                    <h1 className="text-primary text-center">Perfil de {this.state.nombre}</h1>
                    <img className="d-block m-auto" alt="img" src={require(`../../public/champion/${this.state.img}`)}/>
                    <Chart
                    className="float-left"
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Nivel', 'Cooldown'],
                            ['Nivel 1', cdQ1],
                            ['Nivel 2', cdQ2],
                            ['Nivel 3', cdQ3],
                            ['Nivel 4', cdQ4],
                            ['Nivel 5', cdQ5]
                        ]}
                        options={{
                            title: 'Cooldown Q',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        />

                    <Chart
                    className="float-left"
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Nivel', 'Cooldown'],
                            ['Nivel 1', cdW1],
                            ['Nivel 2', cdW2],
                            ['Nivel 3', cdW3],
                            ['Nivel 4', cdW4],
                            ['Nivel 5', cdW5]
                        ]}
                        options={{
                            title: 'Cooldown W',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        />

                    <Chart
                    className="float-left"
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Nivel', 'Cooldown'],
                            ['Nivel 1', cdE1],
                            ['Nivel 2', cdE2],
                            ['Nivel 3', cdE3],
                            ['Nivel 4', cdE4],
                            ['Nivel 5', cdE5]
                        ]}
                        options={{
                            title: 'Cooldown E',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        />

                    <Chart
                    className="float-left"
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Nivel', 'Cooldown'],
                            ['Nivel 1', cdR1],
                            ['Nivel 2', cdR2],
                            ['Nivel 3', cdR3],
                            ['Nivel 4', cdR4],
                            ['Nivel 5', cdR5]
                        ]}
                        options={{
                            title: 'Cooldown R',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        />
                </div>
            );
        }else{
            return(<div></div>)
        }
        
    }
}

export default Personaje;