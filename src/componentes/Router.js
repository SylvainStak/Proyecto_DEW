import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';

class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>                    
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />   
                    <Route exact path="/home" component={Login} />  
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;