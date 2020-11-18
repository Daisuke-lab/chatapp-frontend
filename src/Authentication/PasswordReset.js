import React, { useState }from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
import Navbar from './Navbar.js'
const PasswordReset = (props) => {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        email:'',
    })
    const {email} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        props.reset_password(email)
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
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required/>
            </div>
            <button className='btn btn-primary' type='submit'>Reset Password</button>
        </form>
    </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        reset_password: (email) => dispatch(auth_actions.reset_password(email),)
    }
}



export default connect(null, mapDispatchToProps)(PasswordReset)