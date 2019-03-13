import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux' // BrowserRouter, route digunakan utk menentukan directory component ketika diclick
import cookies from 'universal-cookie';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ManageProduct from './ManageProduct'

import { keepLogin } from '../action';

const cookie = new cookies()

class App extends Component {
    componentDidMount () {
        var userCookie = cookie.get('stillLoggedIn')
        // jika didapatkan username di file cookie, akan memanggil function keepLogin
        if(userCookie !== undefined){
            console.log("cookie ada")
            // function keepLogin akan me-loginkan ulang username yg tersimpan pada file cookie
            this.props.keepLogin(userCookie)
        }
    }

    render () {
        return (
            <BrowserRouter>
                <div> 
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/manageproduct" component={ManageProduct} />
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin})(App);