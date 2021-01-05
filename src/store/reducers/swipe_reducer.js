import * as actionType from '../actions/actionType'

const initialState = {
    swipe_id: localStorage.getItem('swipe_id'), 
    swiped: JSON.parse(localStorage.getItem('swiped')),
    liked: JSON.parse(localStorage.getItem('liked')),
}

function swipe_reducer(state=initialState, action) {
    const {type, payload} = action

    switch(type) {
        case actionType.SWIPE_CREATE_SUCCESS:
        //localStorage.setItem('swipe_id', payload.id)
            return {
                ...state,
                swipe_id: payload.id
            }

        case actionType.SWIPE_RECEIVE_SUCCESS:
            localStorage.setItem('swipe_id', payload.id)
            localStorage.setItem('swiped', JSON.stringify(payload.swiped))
            localStorage.setItem('liked', JSON.stringify(payload.liked))
            return {
                ...state,
                swipe_id: payload.id,
                swiped: payload.swiped,
                liked: payload.liked
            }

        case actionType.SWIPE_CREATE_FAIL:
        case actionType.SWIPE_RECEIVE_FAIL:
            return {
                ...state,
            }

        case actionType.LOG_OUT:
            localStorage.removeItem('swipe_id')
            localStorage.removeItem('swiped')
            localStorage.removeItem('liked')
            return {
                ...state
            }

        default:
            return {
                ...state
            }
    }
}


export default swipe_reducer

