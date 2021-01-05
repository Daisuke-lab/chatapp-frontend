import * as actionType from './actionType'
import axios from 'axios'

export const Create = (user, friend) => async dispatch => {
    if (user != null) {
        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({participants: [user, friend]})
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/chat-api/chat/create/`, body, config)
            dispatch({
                type: actionType.CHAT_CREATE_SUCCESS,
                payload: res.data
            })
        } catch(err) {
            dispatch({
                type: actionType.CHAT_CREATE_FAIL,
                payload: err.response.request.response
            })
            dispatch({
                type: actionType.ERROR,
                payload: err.response.request.response})
        }
    } else {
        dispatch({
            type: actionType.CHAT_CREATE_FAIL,
            payload: 'An error occured. please try again.'
        })
        dispatch({
            type: actionType.ERROR,
            payload: 'An error occured. please try again.'})
    }
}

export const addMessage = message => {
    console.log('addmessage:', message)
    if (message != null) {
        return {
        type: actionType.CHAT_NEW_MESSAGE_SUCCESS,
        payload: message
        };
    }
}
  
export const setMessages = contents => async dispatch => {
    console.log('fetchMessage::',contents)
    if (contents.length > 0) {
        if (contents[0].content.includes('s3')) {
            dispatch({
            type: actionType.CHAT_FETCH_FILES_SUCCESS,
            payload: contents
            })
        } else {
            dispatch({
                type: actionType.CHAT_FETCH_MESSAGES_SUCCESS,
                payload: contents
                });
        }
    }
  };

export const set_friend = (image, when_matched, friend_profile_id) => async dispatch => {
    dispatch({
        type: actionType.SET_FRIEND,
        payload: {image, when_matched, friend_profile_id}
    })
}

// export const get_friend_profile = (profile_id) => async dispatch => {
//     try {
//         const res = await axios.get(`${REACT_APP_API_URL}/profile`)
//     }
// }
  

