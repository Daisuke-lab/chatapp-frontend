import * as actionType from '../actions/actionType'
import image from 'C:\\Users\\daisuke\\ReactProject\\chatapp\\frontend\\src\\assets\\default_image.jpg'
const initialState = {
    id: localStorage.getItem('id'),
    name: localStorage.getItem('name'),
    account_id: localStorage.getItem('account_id'),
    age: localStorage.getItem('age'),
    gender: localStorage.getItem('gender'),
    native_lan:  localStorage.getItem('native_lan'),
    foreign_lan: localStorage.getItem('foreign_lan'),
    image: (localStorage.getItem('image') !== 'null'? localStorage.getItem('image'): `${image}`),
    location: localStorage.getItem('location'),
    time_start: (localStorage.getItem('time_start') !== 'null'? localStorage.getItem('time_start'): ''),
    time_end: (localStorage.getItem('time_end') !== 'null'? localStorage.getItem('time_end'):  ''),
    intro: (localStorage.getItem('intro') !=='null'? localStorage.getItem('intro'): ''),
    freeday: (localStorage.getItem('freeday') !=='null'? localStorage.getItem('freeday'): '')
}

function profile_reducer(state=initialState, action) {
    const {type, payload} = action

    switch(type) {
        case actionType.PROFILE_RECEIVE_SUCCESS:
            localStorage.setItem('id', payload.id)
            localStorage.setItem('name', payload.name)
            localStorage.setItem('account_id', payload.account_id)
            localStorage.setItem('age', payload.age)
            localStorage.setItem('gender', payload.gender)
            localStorage.setItem('native_lan', payload.native_lan)
            localStorage.setItem('foreign_lan', payload.foreign_lan)
            localStorage.setItem('image', payload.image)
            localStorage.setItem('location', payload.location)
            localStorage.setItem('time_start', payload.time_start)
            localStorage.setItem('time_end', payload.time_end)
            localStorage.setItem('intro', payload.intro)
            localStorage.setItem('freeday', payload.freeday)
            return {
                ...state,
                id: payload.id,
                name: payload.name,
                account_id: payload.account_id,
                age: payload.age,
                gender: payload.geder,
                native_lan:  payload.native_lan,
                foreign_lan: payload.foreign_lan,
                image: payload.image,
                location: payload.location,
                time_start: payload.time_start,
                time_end: payload.time_end,
                intro: payload.intro,
                freeday: payload.freeday

            }

        case actionType.PROFILE_UPDATE_SUCCESS:
            return {
                ...state,
                id: payload.id,
                name: payload.name,
                account_id: payload.account_id,
                age: payload.age,
                gender: payload.geder,
                native_lan:  payload.native_lan,
                foreign_lan: payload.foreign_lan,
                image: payload.image,
                location: payload.location,
                time_start: payload.time_start,
                time_end: payload.time_end,
                intro: payload.intro,
                freeday: payload.freeday

            }
        case actionType.PROFILE_DELETE_SUCCESS:
            localStorage.removeItem('id')
            localStorage.removeItem('name')
            localStorage.removeItem('account_id')
            localStorage.removeItem('age')
            localStorage.removeItem('gender')
            localStorage.removeItem('native_lan')
            localStorage.removeItem('foreign_lan')
            localStorage.removeItem('image')
            localStorage.removeItem('location')
            localStorage.removeItem('time_start')
            localStorage.removeItem('time_end')
            localStorage.removeItem('intro')
            localStorage.removeItem('freeday')
            return {
                ...state
            }
            


        case actionType.PROFILE_UPDATE_FAIL:
        case actionType.PROFILE_RECEIVE_FAIL:
        case actionType.PROFILE_CREATE_SUCCESS:
        case actionType.PROFILE_DELETE_FAIL:
            return {
                ...state
            }

        default:
            return {
                ...state
            }
    }
}

export default profile_reducer