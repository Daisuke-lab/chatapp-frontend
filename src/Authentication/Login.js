import React, { useState }from 'react'
import {Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SpaIcon from '@material-ui/icons/Spa';
import { IconButton } from '@material-ui/core';
import * as auth_actions from '../store/actions/auth_action'
import * as profile_actions from '../store/actions/profile_action'
import '../assets/Login.css'
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
    <div className='login'>
        <header className='login_header'>
            <Link to='/'>
            <IconButton id='login_back'>
                <ArrowBackIosIcon/>
            </IconButton>
            </Link>
            <div className='login_title'><SpaIcon id='login_logo'/><h1>Speak Up</h1></div>
        </header>
        <div className='login_form'>
        <form onSubmit={e => onSubmit(e)}>
                <input 
                className='login_input'
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required/>
                <input 
                className='login_input'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                required/>
                <button className='login_button' type='submit'onfocus="this.blur();"><span>Log In</span></button>
        </form>
        <p className='mt-3'>
            Don't have an account? <Link to='/signup'>Sign up</Link>
        </p>
        <p className='mt-3'>
            Forget your password? <Link to='/reset_password'>Reset Password</Link>
        </p>
        </div>
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
        receive_profile : (id) => dispatch(profile_actions.Receive(id))
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Login)