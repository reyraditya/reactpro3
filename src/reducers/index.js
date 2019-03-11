import {combineReducers} from 'redux';


const init = {
    id: '',
    username: ''
}

// Semua yang berhubungan dengan autentifikasi/login user, dihandle oleh fn AuthReducers
// Maka dari itu, kita gunakan switch.
const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSFUL':
            return {...state, id: action.payload.id, username: action.payload.username} // menggandakan object(membuat obj baru) dari state = init yang masih berupa obj kosong dengan property yang sama namun value berbeda, disini value yang diupdate adalah id dan username yg dibawa oleh action creator onLoginClick(mengambil data dari database).
        
        default:
            return state
        
    }
}

export default combineReducers (
    {
        auth: AuthReducer // isi dari fn AuthReducers disimpan di variable auth
    }
)