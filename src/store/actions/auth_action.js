import * as actionType from './actionType'
import axios from 'axios'
export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try {
            // use shift and @ instead of shift and 7
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config)
            dispatch({
                type: actionType.LOAD_USER_SUCCESS,
                payload: res.data})
        } catch (err) {
        dispatch({
                type: actionType.LOAD_USER_FAIL})
        }
    } else {
        console.log('no access')
        dispatch({
            type: actionType.LOAD_USER_FAIL})
    }
}
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email, password})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config)
        console.log(res.data)
        dispatch({
            type: actionType.LOGIN_SUCCESS,
            payload: res.data})

        dispatch(load_user())
    } catch (err) {
        dispatch({
            type: actionType.LOGIN_FAIL})
    }
}

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const body = JSON.stringify({ token: localStorage.getItem('access')})
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res !== 'token_not_valid') {
                dispatch({
                    type: actionType.AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: actionType.AUTEHNTICATED_FAIL
            })
        }
            
        } catch(err) {
            dispatch({
                type: actionType.AUTEHNTICATED_FAIL
            })
        }
        
    } else {
        dispatch({
            type: actionType.AUTEHNTICATED_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: actionType.LOG_OUT
    })
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config)
        console.log('PASSWORD_RESET')
        dispatch({
            type: actionType.PASSWORD_RESET_SUCCESS,
            payload: res.data})

    } catch (err) {
        dispatch({
            type: actionType.PASSWORD_RESET_FAIL})
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({uid, token, new_password, re_new_password})
    console.log('PASSWORD_RESET_CONFIRM')
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config)
        dispatch({
            type: actionType.PASSWORD_RESET_CONFIRM_SUCCESS})
    } catch (err) {
        dispatch({
            type: actionType.PASSWORD_RESET_CONFIRM_FAIL})
    }
}

export const signup = (name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password, re_password})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)
        console.log('res in signup::', res.data)
        //{name: "lol", email: "jeorgia.zr@gmail.com", id: 2}
        dispatch({
            type: actionType.SIGNUP_SUCCESS,
            payload: res.data})
            localStorage.setItem('name', name)
        

    } catch (err) {
        dispatch({
            type: actionType.SIGNUP_FAIL})
    }

}

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({uid, token})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)
        console.log(res.data)
        dispatch({
            type: actionType.ACTIVATION_SUCCESS,
            payload: res.data})

    } catch (err) {
        dispatch({
            type: actionType.ACTIVATION_FAIL})
    }
}




// try {
//     const res = await axios.get(`${process.env.REACT_APP_API_URL}/account/detail/${email}/`)
//     console.log(res.data)
//     localStorage.setItem('id', res.data.id)
// } catch (err) {
//     dispatch({
//         type:actionType.SIGNUP_FAIL
//     })
// }