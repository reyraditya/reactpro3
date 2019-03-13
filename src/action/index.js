import axios from 'axios';
import cookies from 'universal-cookie';

const cookie = new cookies()

// fn action creator yg menghubungkan component ke redux store
export const onLoginClick = (user, pass) => {
    // utk mengambil dan menyocokkan data yang telah disave di database
    return (dispatch) => {
        axios.get("http://localhost:1996/users", {
            params: {
                username: user,
                password: pass
            }
        }).then(response => {
            if (response.data.length > 0) {
                // jika data username ditemukan/object ada isinya
                console.log(response.data[0]); // mengambil object index 0 utk dikirim ke redux

                const {id, username} = response.data[0] //ambil data dari property id dan username
                dispatch({
                    type: "LOGIN_SUCCESSFUL",
                    payload: {id, username} // penyederhanaan jika key dan valuenya bernama sama, cukup tulis valuenya saja
                })
                cookie.set('stillLoggedIn', username, {path:"/"})
            } else {
                // jika username tidak ditemukan
                dispatch({
                    type: 'AUTH_ERROR',
                    payload: "Username and Password don't match" 
                })
               

            }
        }).catch(err => {
            console.log("System Error");
        })
    } 
}

export const onRegistClick = (user, email, pass) => {
    return dispatch => {
        axios.get("http://localhost:1996/users", {
            params:{
                username: user
            }
        }).then(response => {
            if(response.data.length === 0){
                axios.post("http://localhost:1996/users", {
                    username: user,
                    password: pass,
                    email: email
                }).then(response => {
                    dispatch({
                        type: 'AUTH_SUCCESS',
                        payload: 'Register succeeded!'
                    });
                }) 
            } else {
                dispatch({
                    type: 'AUTH_ERROR',
                    payload: 'Username has been taken'
                }) 
            }
        })
    }
}

export const keepLogin = (user) => {
    return dispatch => {
        axios.get('http://localhost:1996/users', {
            params: {
                username: user   
            }
        }).then(response => {
            if(response.data.length > 0){
                dispatch({
                    type: 'LOGIN_SUCCESSFUL',
                    payload: {username: user}
                })
            }
        })
    }
}

export const onLogoutUser = () => {
    cookie.remove('stillLoggedIn')
    return {type: "LOGOUT_USER"};
}

export const onSetTimeOut = () => {
    return {type: "SET_TIMEOUT"}
}
