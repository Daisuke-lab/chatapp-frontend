import * as actionType from './actionType'
import axios from 'axios'

export const Create = (user, name, native_lan, foreign_lan) => async dispatch => {
    if (user != null) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({user, name, native_lan, foreign_lan})
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/profile/create/`, body, config)
            dispatch({
                type: actionType.PROFILE_CREATE_SUCCESS,
                payload: res.data
            })
        } catch(err) {
            dispatch({
                type: actionType.PROFILE_CREATE_FAIL,
                paylaod: err.response.request.response
            })
            dispatch({
            type: actionType.ERROR,
            payload: err.response.request.response})
        }
    } else {
        dispatch({
            type: actionType.PROFILE_CREATE_FAIL
        })
        dispatch({
            type: actionType.ERROR,
            payload: "An error occured. Please try again"})
    }
}


export const Receive = (id) => async dispatch => {
    console.log('PROFILE')
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/detail/${id}/`)
        console.log('profile::', res.data)
        dispatch ({
            type: actionType.PROFILE_RECEIVE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type:actionType.PROFILE_RECEIVE_FAIL,
            payload: err.response
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.response})
    }
}

export const Update = (id, name, age, gender, native_lan, foreign_lan, location, time_start, time_end, intro, freeday) => async dispatch => {
    console.log('time:',typeof  time_start)
    try {
        const config = {
            headers: {'Content-Type': 'application/json',
        }}

        const body = JSON.stringify({name, age, gender, native_lan, foreign_lan, location, time_start,
             time_end, intro, freeday})
        

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/profile/update/${id}/`, body, config)
        dispatch({
            type: actionType.PROFILE_UPDATE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: actionType.PROFILE_UPDATE_FAIL,
            payload: err.response.request.response
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.response.request.response})
    }
}

export const Delete = (id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/profile/delete/${id}/`)
        dispatch({
            type: actionType.PROFILE_DELETE_SUCCESS,
        })
    } catch(err) {
        dispatch({
            type: actionType.PROFILE_DELETE_FAIL,
            payload: err.response.request.response
        })
        dispatch({
            type: actionType.ERROR,
            payload: err.response.request.response})
    }
}


