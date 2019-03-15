import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux' // BrowserRouter, route digunakan utk menentukan directory component ketika diclick
import cookies from 'universal-cookie';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import ManageProduct from './ManageProduct'
import DetailProduct from './DetailProduct'

import { keepLogin } from '../action';
import ProductItem from './ProductItem';

const cookie = new cookies()

class App extends Component {
    componentDidMount () {
        var userCookie = cookie.get('stillLoggedIn') // jika didapatkan username di file cookie, akan memanggil function keepLogin
        if(userCookie !== undefined){ // function keepLogin akan me-loginkan ulang username yg tersimpan pada file cookie
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
                    <Route path="/productitem" component={ProductItem}/>
                    <Route path="/manageproduct" component={ManageProduct} />
                    <Route path="/detailproduct/:id" component={DetailProduct} />
                </div>
            </BrowserRouter>
        )
    }
}

const mapsStateToProps = state => {
    return {username: state.auth.username}
}

export default connect(mapsStateToProps, {keepLogin})(App);