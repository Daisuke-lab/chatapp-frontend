import React, { useEffect } from 'react'
import Header from '../Swipe/Header'
import Profile from './Profile'
import '../assets/Setting/Setting.css'
import {Link, } from 'react-router-dom'
import {connect} from 'react-redux'
import * as auth_actions from '../store/actions/auth_action'
import Card2 from '../Swipe/Card2'

// className='setting'
function Setting(props) {
    console.log(props.person)
    return (
        <div>
            <Header/>
            <div id='setting_content' style={{justifyContent: 'space-evenly'}}>
            <Card2 data={props.person} images={props.images}/>
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
const mapstateToProps = state => {
    return {
        person: state.profile_reducer,
        images: state.image_reducer.images
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth_actions.logout())
    }
}
export default connect(mapstateToProps, mapDispatchToProps)(Setting)


