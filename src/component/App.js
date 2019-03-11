import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// BrowserRouter, route digunakan utk menentukan directory component ketika diclick

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <div> 
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;