import * as actionType from '../actions/actionType'

const initialState = {
    messages: [],
    files: [],
    friend_image: localStorage.getItem('friend_image'),
    when_matched:localStorage.getItem('when_matched'),
    friend_profile_id: localStorage.getItem('friend_profile_id')
}

function chat_reducer(state=initialState, action) {
    const {type, payload} = action

    switch(type) {
        case actionType.CHAT_CREATE_SUCCESS:
            return {
                ...state
            }

        case actionType.CHAT_CREATE_FAIL:
            return {
                ...state
            }

        case actionType.CHAT_FETCH_MESSAGES_SUCCESS:
            console.log('messages:', payload)
            return {
                ...state,
                messages: payload.reverse()
            }
        case actionType.CHAT_NEW_MESSAGE_SUCCESS:
            return {
                ...state,
                messages: [...state.messages, payload[0]]
            }

        case actionType.CHAT_FETCH_FILES_SUCCESS:
            console.log('messages:', payload)
            return {
                ...state,
                files: payload.reverse()
            }
        case actionType.CHAT_NEW_FILE_SUCCESS:
            return {
                ...state,
                files: [...state.files, payload[0]]
            }

        case actionType.SET_FRIEND:
            localStorage.setItem('friend_image', payload.image)
            localStorage.setItem('when_matched', payload.when_matched)
            localStorage.setItem('friend_profile_id', payload.friend_profile_id)
            return {
                ...state,
                friend_image: payload.image,
                when_matched: payload.when_matched,
                friend_profile_id: payload.friend_profile_id
            }

        case actionType.LOG_OUT:
            localStorage.removeItem('friend_image')
            localStorage.removeItem('when_matched')
            localStorage.removeItem('friend_profile_id')
            return {
                ...state,
                friend_image:null,
                when_matched: null,
                friend_profile_id:null
            }

        default:
            return {
                ...state
            }
    }
}

export default chat_reducer