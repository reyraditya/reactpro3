import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

import {onLoginClick} from '../action'


class Login extends Component{
    onSubmitClick = () => {
        const user = this.username.value
        const pass = this.password.value
        this.props.onLoginClick(user, pass)   
    }

    render(){
        return(
            <div>
                <div className="mt-5 row">
                    <div className="col-sm-3 mx-auto card">
                        <div className="card-body">
                            <div className="border-bottom border-secondary card-title">
                                <h1>Login</h1>
                            </div>
                            <div className="card-title mt-1">
                                <h4>Username</h4>
                            </div>
                            <form className="input-group"><input ref={input => {this.username = input}} className="form-control" type="text"/></form>
                            {/* ref akan menjalankan fn input yg akan menyimpan inputan dari form ke dalam var this.username. */}
                            {/* kalo mau panggil isi inputan tinggal this.username.value */}
                            <div className="card-title mt-1">
                                <h4>Password</h4>
                            </div>
                            <form className="input-group"><input ref={input => {this.password = input}} className="form-control" type="password"/>
                            </form>
                            <button onClick={this.onSubmitClick} className="btn btn-success btn-block mt-5" >Login</button>
                            <p className="lead">Don't have account ? <Link to="/register">Sign Up!</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect (null, {onLoginClick})(Login); 