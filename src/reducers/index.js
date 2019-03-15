import {combineReducers} from 'redux';


const init = { //state initial
    id: '',
    username: '',
    error: '',
    success: ''
}

// Semua yang berhubungan dengan autentifikasi/login user, dihandle oleh fn AuthReducers
// Maka dari itu, kita gunakan switch.
const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESSFUL':
            return {
                ...state, 
                id: action.payload.id, 
                username: action.payload.username
            } // ...state: menggandakan object(membuat obj baru) dari state = init(initial) yang masih berupa obj kosong dengan property yang sama namun value berbeda, disini value yang diupdate adalah id dan username yg dibawa oleh action creator onLoginClick(mengambil data dari database)(===> Lihat ES6).

        case 'LOGOUT_USER':
            // window.location.pathname="/"
            return(state = init); // atau return {...state, ...init} => sama aja dengan state = init

        case 'AUTH_ERROR':
            return{
                ...state,
                error: action.payload,
                success: '' // kalo error, suksesnya harus kosong
            };

        case 'SET_TIMEOUT':
            return{
                ...state,
                error: '',
                success: ''
                // Jadi kita menghilangkan notifikasi saat error dan sukses
            }

        case 'AUTH_SUCCESS':
            return{
                ...state,
                error: '', // jadi kalo sukses, errornya harus kosong
                success: action.payload

            }
        
        default:
            return state
        
    }
}

export default combineReducers (
    {
        auth: AuthReducer // isi dari fn AuthReducers disimpan di variable auth
    }
)