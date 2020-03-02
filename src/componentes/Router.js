import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import newUser from './newUser';
import phoneLogin from './phoneLogin';
import Mostrador from './Mostrador';
import Personaje from './Personaje';

class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>                    
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />   
                    <Route exact path="/home" component={Login} />
                    <Route exact path="/newUser" component={newUser} />
                    <Route exact path="/phoneLogin" component={phoneLogin} />
                    <Route exact path="/mostrador" component={Mostrador} />
                    <Route exact path="/personaje" component={Personaje} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;