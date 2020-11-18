import React, { useState }from 'react'
import {Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
import Navbar from './Navbar.js'
import * as profile_actions from '../store/actions/profile_action'
const Login = (props) => {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const {email, password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        props.login(email, password)
    }
    if (props.id) {
        console.log('id::', props.id)
        props.receive_profile(props.id)
        console.log('gender::', props.gender)
        return <Redirect to='/swipe'/>
    }
    return (
    <div className='eontainer mt-5'>
        <Navbar/>
        <h1>Sign in</h1>
        <p1>Sign into your Account</p1>
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
            <div className='form-group'>
                <input 
                className='from-control'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                required/>
            </div>
            <button className='btn btn-primary' type='submit'>Login</button>
        </form>
        <p className='mt-3'>
            Don't have an account? <Link to='/signup'>Sign up</Link>
        </p>
        <p className='mt-3'>
            Forget your password? <Link to='/reset_password'>Reset Password</Link>
        </p>
    </div>
    )
}

const mapstateToProps = state => {
    return {
    isAuthenticated: state.auth_reducer.isAuthenticated,
    id: state.auth_reducer.id,
    gender: state.profile_reducer.gender
}
}

const mapDispatchToProps = dispatch => {
    return {
        login : (email, password) => dispatch(auth_actions.login(email, password)),
        receive_profile : (id) => dispatch(profile_actions.receive(id))
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Login)