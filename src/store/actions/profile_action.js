import * as actionType from './actionType'
import axios from 'axios'

export const Create = (account_id, name, native_lan, foreign_lan) => async dispatch => {
    const config = {
        headers: {
        'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({account_id, name, native_lan, foreign_lan})
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/myprofile/create/`, body, config)
        dispatch({
            type: actionType.PROFILE_CREATE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: actionType.PROFILE_CREATE_FAIL
        })
    }
}


export const Receive = (account_id) => async dispatch => {
    console.log(`${process.env.REACT_APP_API_URL}/myprofile/receive/${account_id}/`)
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/myprofile/detail/${account_id}/`)
        dispatch ({
            type: actionType.PROFILE_RECEIVE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type:actionType.PROFILE_RECEIVE_FAIL,
        })
    }
}

export const Update = (name, account_id, age, gender, native_lan, foreign_lan, image, location, time_start, time_end, intro, freeday) => async dispatch => {
    console.log(JSON.stringify({name, account_id, age, gender, native_lan, foreign_lan, image, location, time_start, time_end, intro, freeday}))
    try {
        const config = {
            headers: {'Content-Type': 'multipart/form-data',
            //multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
            //multipart/form-data
            //'Accept': 'application/json'
        }}
        const body = JSON.stringify({name, account_id, age, gender, native_lan, foreign_lan, image, location, time_start, time_end, intro, freeday})
        const formData = new FormData();
        formData.append("name", name)
        formData.append("account_id", account_id)
        formData.append("age", age)
        formData.append("gender", gender)
        formData.append("native_lan", native_lan)
        formData.append("foreign_lan", foreign_lan)
        formData.append("image", image)
        formData.append("location", location)
        formData.append("time_start", time_start)
        formData.append("time_end", time_end)
        formData.append("intro", intro)
        formData.append("freeday", freeday)


        const res = await axios.put(`${process.env.REACT_APP_API_URL}/myprofile/update/${account_id}/`, formData, config)
        dispatch({
            type: actionType.PROFILE_UPDATE_SUCCESS,
            payload: res.data
        })
    } catch(err) {
        console.log(err.response.request.response)
        console.log(err)
        dispatch({
            type: actionType.PROFILE_UPDATE_FAIL,

        })
    }
}

export const Delete = (account_id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/myprofile/delete/${account_id}/`)
        dispatch({
            type: actionType.PROFILE_DELETE_SUCCESS,
        })
    } catch(err) {
        dispatch({
            type: actionType.PROFILE_DELETE_FAIL
        })
    }
}

