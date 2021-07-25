import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage'
import ItemDetailPage from './pages/ItemDetailPage';

const Routes = () => {
    return(
        <div className="container-fluid">
            <BrowserRouter>
                <Switch>
                    <Route path="/" >
                        asdfasdf
                        <HomePage/>
                    </Route>
                    <Route path="/resultado-busqueda/:palabraBuscada" component={ItemDetailPage}>
                        paginaresultadobusqueda
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;
