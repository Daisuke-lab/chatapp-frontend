import React, { useEffect } from 'react'
import Header from '../Swipe/Header'
import Profile from './Profile'
import '../assets/Setting.css'
import {Link, } from 'react-router-dom'
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'

function Setting(props) {
    return (
        <div>
            <Header/>
            <div className='setting'>
            <Profile/>
            <div className='Button'>
                <Link to='/edit'>
                <button className='setting_button1' onfocus="this.blur();"><span>Edit Your Profile</span></button>
                </Link>
                <Link to='/'>
                <button className='setting_button1' onfocus="this.blur();" onClick={props.logout}><span>Log Out</span></button>
                </Link>
            <button className='setting_button3' onfocus="this.blur();"><span>Delete Your Account</span></button>
            </div>
            </div>

            
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth_actions.logout())
    }
}
export default connect(null, mapDispatchToProps)(Setting)


