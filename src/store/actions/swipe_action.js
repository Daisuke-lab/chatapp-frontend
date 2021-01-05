import * as actionType from './actionType'
import axios from 'axios'

export const Create = (user) => async dispatch =>{
    console.log(JSON.stringify({user}))
    if (user != null) {
        try {
            const config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify({user})
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/swipe/create/`, body, config)
            dispatch({
                type: actionType.SWIPE_CREATE_SUCCESS,
                payload: res.data
            })
        
        } catch(err) {
            dispatch({
                type: actionType.SWIPE_CREATE_FAIL,
                payload: err.response.request.response
            })
            dispatch({
                type: actionType.ERROR,
                payload: err.response.request.response})
        }
    } else {
        dispatch({
            type: actionType.SWIPE_CREATE_FAIL
        })
        dispatch({
            type: actionType.ERROR,
            payload: "An error occured. Please try again."})
    }

}

export const Receive = (id) => async dispatch => {
    console.log('SWIPE')
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/swipe/detail/${id}/`)
        console.log('res.data in swipe::', res.data)
        dispatch({
            type: actionType.SWIPE_RECEIVE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: actionType.SWIPE_RECEIVE_FAIL,
            payload: err.response
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.response})
    }
}

export const Swipe = (swipe_id, swiped, liked) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        var body = null
        if (liked === null) {
            body = JSON.stringify({swiped})
        } else {
            body = JSON.stringify({swiped, liked})
        }
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/swipe/update/${swipe_id}/`, body, config)
        dispatch({
            type: actionType.SWIPE_UPDATE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: actionType.SWIPE_UPDATE_FAIL,
            payload: err.response.request.response
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.response.request.response})
    }
}