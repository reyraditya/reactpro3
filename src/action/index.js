import axios from 'axios';

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
            } else {
                // jika username tidak ditemukan
                console.log("Username and password not match");
            }
        }).catch(err => {
            console.log("System Error");
        })
    } 
}
