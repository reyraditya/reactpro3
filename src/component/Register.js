import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { onRegistClick } from '../action';
import { onSetTimeOut} from '../action';


class Register extends Component{
    onSubmit = () => {
        const user = this.username.value;
        const pass = this.password.value;
        const mail = this.email.value;

        this.props.onRegistClick(user, mail, pass);
    }

    onErrorRegister = () => {
        if(this.props.error !== ''){ 
            setTimeout(this.props.onSetTimeOut, 2000);
            this.username.value = ''; // Menghilangkan input username kalo error
            // baca: kalau error tidak kosong(berisi), maka hasilkan text yg diset di action dan disimpan di variable error di reducer.
            return (
                <div className="alert alert-danger mt-4">
                    {this.props.error}
                </div>
            )
        } else if(this.props.success !== ''){
            setTimeout((this.props.onSetTimeOut), 2000)
            return (
                <div className="alert alert-success mt-4">
                    {this.props.success}
                    <Redirect to="/login"/>
                </div>
            )
        }
    }

    render(){
        if(this.props.username === ''){ //kalau user tidak logged in, maka
            return(
                <div>
                   <div className="mt-5 row">
                        <div className="col-sm-3 mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>Register</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Username</h4>
                                </div>
                                <form className="input-group">
                                    <input ref={input => {this.username = input}} className="form-control" type="text"/>
                                </form>
                                {this.onErrorRegister()}
                                <div className="card-title mt-1">
                                    <h4>E-mail</h4>
                                </div>
                                <form className="input-group">
                                    <input ref={input => {this.email = input}} className="form-control" type="email"/>
                                </form>
                                <div className="card-title mt-1">
                                    <h4>Password</h4>
                                </div>
                                <form className="input-group"><input ref={input => {this.password = input}} className="form-control" type="password"/>
                                </form>
                                <button onClick={this.onSubmit} className="btn btn-success btn-block mt-5" >Sign Up</button>
                                <p className="lead">
                                    Already have an account?
                                    <Link to="/login">
                                    Sign in!
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div> 
            )
        } else {
            return <Redirect to="/"/>
        }     
    }
}

const mapsStateToProps = state => {
    return {username: state.auth.username ,error: state.auth.error, success: state.auth.success}
}

export default connect(mapsStateToProps, {onRegistClick, onSetTimeOut})(Register);