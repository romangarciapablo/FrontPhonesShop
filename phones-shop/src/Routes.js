import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home'
import ItemDetail from './pages/ItemDetail';

const Routes = () => {
    return(
        <div className="container-fluid">
            <Route path="/" exact component={Home} />
            <Route path="/resultado-busqueda/:palabraBuscada" component={ItemDetail} />
        </div>
    )
}

export default Routes;
