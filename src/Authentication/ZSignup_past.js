import React, { useState }from 'react'
import {Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
import Navbar from './Navbar.js'
const Signup = (props) => {
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password:'',
        re_password: ''
    })

    const {name, email, password, re_password} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        console.log(name, email, password, re_password)
        props.signup(name, email, password, re_password)
        setAccountCreated(true)
    }
    if (props.isAuthenticated) {
        return <Redirect to='/'/>
    }
    if (accountCreated) {
        return <Redirect to='/'/>
    }
    return (
    <div className='eontainer mt-5'>
        <Navbar/>
        <h1>Sign up</h1>
        <p1>Create your Account</p1>
        <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
                <input 
                className='from-control'
                type='name'
                placeholder='name'
                name='name'
                value={name}
                onChange={e => onChange(e)}
                required/>
            </div>
            <div className='form-group'>
                <input 
                className='from-control'
                type='email'
                placeholder='Email*'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required/>
            </div>
            <div className='form-group'>
                <input 
                className='from-control'
                type='password'
                placeholder='Password*'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                required/>
            </div>
            <div className='form-group'>
                <input 
                className='from-control'
                type='password'
                placeholder='Confirm Password*'
                name='re_password'
                value={re_password}
                onChange={e => onChange(e)}
                required/>
            </div>
            <button className='btn btn-primary' type='submit'>Sign up</button>
        </form>
        <p className='mt-3'>
            Already have an account? <Link to='/login'>Log in</Link>
        </p>
    </div>
    )
}

const mapstateToProps = state => ({
    isAuthenticated: state.auth_reducer.isAuthenticated
})

const mapDispatchToProps = dispatch => {
    return {
        signup : (name, email, password, re_password) => dispatch(auth_actions.signup(name, email, password, re_password))
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Signup)