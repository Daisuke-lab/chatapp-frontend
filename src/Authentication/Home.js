import React, {useEffect}from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import image from '../assets/home_page4.jpg'
import SpaIcon from '@material-ui/icons/Spa';
import '../assets/Authentication/Home.css'
import * as auth_actions from '../store/actions/auth_action'
const Home = (props) => {
    var Background
    if (window.innerWidth > 650) {
        Background = {
            width: '100%',
            height: '800px',
            backgroundSize: 'cover',
            backgroundImage: `url(${image})`
        }
    } else {
        Background = {
            width: '100%',
            height: '800px',
            backgroundSize: 'cover',
            backgroundColor: '#ec7878'
        }
    }

    useEffect(() => {
        props.remove_error()
        props.back_to_home()
        console.log(process.env.REACT_APP_API_URL)
    }, [])
    return (
        <div style={Background} className='home'>
            <div className='home_title'><SpaIcon id='home_logo'/><h1>Speak Up</h1></div>
            <h1 className={window.innerWidth > 650?'home_intro':'home_intro2'}>
                Find Your Language Exchange Partner!!</h1>
            <Link to='/login'>
            <button className='home_button1' onFocus="this.blur();"><span>Sign In</span></button>
            </Link>
            <Link to='/signup'>
            <button className='home_button2' onFocus="this.blur();"><span>Sign Up</span></button>
            </Link>
            <p style={{color: "yellow", textAlign: 'center', fontSize:'25px'}}>{props.activation}</p>
        </div>
    )
}

const mapstateToProps = state => {
    return {
        activation: state.auth_reducer.activation
    }
}

const mapDispatchToProps = dispatch => {
    return {
        remove_error: () => dispatch(auth_actions.remove_error()),
        back_to_home: () => dispatch(auth_actions.back_to_home())
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Home)