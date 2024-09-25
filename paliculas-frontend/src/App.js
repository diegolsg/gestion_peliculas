import React from 'react'
import{ BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import { Header } from './components/ui/Header';
import { TipoView } from './components/tipo/TipoView';
import { MediaView } from './components/media/MediaView';
import { GeneroView } from './components/genero/GeneroView';
import { ProductoraView } from './components/productora/ProductoraView';
import { DirectorView } from './components/director/DirectorView';

const App = () => {
  
   return <Router>
    <Header/>
    <Switch>
        <Route exact path = '/' component={MediaView}/>
        <Route exact path = '/generos' component={GeneroView}/>
        <Route exact path = '/productoras' component={ProductoraView}/>
        <Route exact path = '/directores' component={DirectorView}/>
        <Route exact path = '/tipos' component={TipoView}/>
        <Redirect to='/' />
    </Switch>
   </Router>
 
}

export {App}
