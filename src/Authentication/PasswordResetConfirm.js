import React, { useState }from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
import Navbar from './Navbar.js'
const PasswordResetConfirm = (props) => {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        new_password:'',
        re_new_password:''
    })
    console.log('token::', props.token)
    const {new_password, re_new_password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        const uid = props.uid
        const token = props.token
        props.reset_password_confirm(uid, token, new_password, re_new_password)
        setRequestSent(true)
    }
    if (requestSent) {
        return <Redirect to='/'/>
    }
    return (
    <div className='eontainer mt-5'>
        <Navbar/>
        <h1>Request Password Reset</h1>
        <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                <input 
                className='from-control'
                type='password'
                placeholder='New Pasword'
                name='new_password'
                value={new_password}
                onChange={e => onChange(e)}
                required/>
            </div>
            <div className='form-group'>
                <input 
                className='from-control'
                type='password'
                placeholder='Confirm New Password'
                name='re_new_password'
                value={re_new_password}
                onChange={e => onChange(e)}
                required/>
            </div>
            <button className='btn btn-primary' type='submit'>PasswordResetConfirm</button>
        </form>
    </div>
    )
}

// if resetpasswordconfirm send token and uid to this component, but you can't put two variables on PasswordResetConfirm.
// so you need to use mapStateProps to use them
const mapstateToProps = (state, objects) => {
    return {
        uid: objects.match.params.uid,
        token: objects.match.params.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reset_password_confirm: (uid, token, new_password, re_new_password) => dispatch(auth_actions.reset_password_confirm(uid, token, new_password, re_new_password),)
    }
}



export default connect(mapstateToProps, mapDispatchToProps)(PasswordResetConfirm)