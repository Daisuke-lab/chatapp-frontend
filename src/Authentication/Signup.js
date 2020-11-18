import React, { useState }from 'react'
import {Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
import * as profile_action from '../store/actions/profile_action'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SpaIcon from '@material-ui/icons/Spa';
import { IconButton } from '@material-ui/core';
import '../assets/Signup.css'

const Signup = (props) => {
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password:'',
        re_password: '',
        native_lan: '',
        foreign_lan: ''
    })

    const {name, email, password, re_password, native_lan, foreign_lan} = formData
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    const onSubmit = e => {
        e.preventDefault()
        props.signup(name, email, password, re_password)
        //props.profile_create(name, native_lan, foreign_lan)
        setAccountCreated(true)
    }
    if (props.id) {
        props.profile_create(props.id, name, native_lan, foreign_lan)
    } 

    const languages = ['Arabic','Bengali','Burmese','Chinese','English','French','German','Gujarati','Hindi','Italian','Japanese','Kannada','Korean','Malayalam',
'Marathi','Oriya','Panjabi','Persian','Polish','Portuguese','Russian','Spanish','Tamil','Telugu','Thai','Turkish','Ukrainian','Urdu','Vietnamese']
    if (props.isAuthenticated) {
        return <Redirect to='/'/>
    }
    if (accountCreated) {
        return <Redirect to='/'/>
    }
    return (
    <div className='signup'>
        <header className='signup_header'>
            <Link to='/'>
            <IconButton id='signup_back'>
                <ArrowBackIosIcon/>
            </IconButton>
            </Link>
            <div className='signup_title'><SpaIcon id='signup_logo'/><h1>Speak Up</h1></div>
        </header>
        <form onSubmit={e => onSubmit(e)}>
            <div  className='signup_form'>
            <div className='col signup_form1'>
                <input className='signup_input' type='name' placeholder='Name*' name='name'
                value={name} onChange={e => onChange(e)} required/>
                <input className='signup_input' type='email'
                placeholder='Email*' name='email' value={email} onChange={e => onChange(e)} required/>
                <input className='signup_input' type='password' placeholder='Password*' name='password'
                value={password} onChange={e => onChange(e)} required/>
                <input className='signup_input' type='password' placeholder='Confirm Password*'
                name='re_password' value={re_password} onChange={e => onChange(e)} required/>
                </div>
                <div className='col signup_form2'>
                <div className='signup_lan'>
                    What language are you fluent in?
                <select className='signup_select' name='native_lan' required>
                    <option hidden>You speak ...</option>
                    {languages.map((language) => {
                        return <option>{language}</option>
                    })}
                </select>
                </div>
                <div className='signup_lan'>
                    What do you want to learn?
                <select className='signup_select' name='foreign_lan' required>
                    <option hidden>You want to learn ...</option>
                    {languages.map((language) => {
                        return <option>{language}</option>
                    })}
                </select>
                </div>
                </div>
                </div>
                <div className='signup_button'>
                        <button  onFocus="this.blur();" type='submit'><span>Sign Up</span></button>
                </div>
        </form>
        <p style={{textAlign: 'center'}}>
            Already have an account? <Link to='/login'>Log in</Link>
        </p>
    </div>
    )
}

const mapstateToProps = state => ({
    isAuthenticated: state.auth_reducer.isAuthenticated,
    id: state.auth_reducer.id
})

const mapDispatchToProps = dispatch => {
    return {
        signup : (name, email, password, re_password) => dispatch(auth_actions.signup(name, email, password, re_password)),
        profile_create: (account_id, name, native_lan, foreign_lan) => dispatch(profile_action.Receive(account_id, name, native_lan, foreign_lan))

    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Signup)



