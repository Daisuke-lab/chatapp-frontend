import * as actionType from '../actions/actionType'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    name: localStorage.getItem('name'),
    id: localStorage.getItem('id')
}

function auth_reducer(state = initialState, action)  {
    const {type, payload } = action

    switch(type) {
        case actionType.LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
            }

        
        case actionType.LOGIN_FAIL:
        case actionType.SIGNUP_FAIL:
        case actionType.LOG_OUT:
            if (localStorage.getItem('access')) {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            }
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                name: null,
                id: null  
            }
        
            
        case actionType.LOAD_USER_SUCCESS:

            return {
                ...state,
                name: payload.name,
                id: payload.id
            }
        
        case actionType.LOAD_USER_FAIL:
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                name: null,
                id: null
            }

        case actionType.AUTHENTICATED_SUCCESS:
            return {
                ...state,
                name: payload.name
            }
        
        case actionType.AUTEHNTICATED_FAIL:
            return {
                ...state,
                name: null,
                id: null
            }

        case actionType.SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                id: payload.id

            }
        case actionType.PASSWORD_RESET_SUCCESS:
        case actionType.PASSWORD_RESET_FAIL:
        case actionType.PASSWORD_RESET_CONFIRM_SUCCESS:
        case actionType.PASSWORD_RESET_CONFIRM_FAIL:
        case actionType.ACTIVATION_FAIL:
        case actionType.ACTIVATION_SUCCESS:
            return {
                ...state,
            }
        
        default:
            return state
    }

}

export default auth_reducer
