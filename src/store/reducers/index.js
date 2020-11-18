import { combineReducers } from 'redux'
import auth_reducer from './auth_reducer'
import profile_reducer from './profile_reducer'
export default combineReducers({
    auth_reducer,
    profile_reducer,
})