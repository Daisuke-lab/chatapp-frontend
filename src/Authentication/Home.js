import React from 'react'
import { Link } from 'react-router-dom'
import image from '../assets/home_page3.jpg'
import SpaIcon from '@material-ui/icons/Spa';
import '../assets/Home.css'
const Home = () => {
    const Background = {
        width: '100%',
        height: '800px',
        backgroundSize: 'cover',
        backgroundImage: `url(${image})`
    }
    return (
        <div style={Background} className='home'>
            <div className='home_title'><SpaIcon id='home_logo'/><h1>Speak Up</h1></div>
            <h1 className='home_intro'>Find Your Language Exchange Partner!!</h1>
            <Link to='/login'>
            <button className='home_button1' onfocus="this.blur();"><span>Sign In</span></button>
            </Link>
            <Link to='/signup'>
            <button className='home_button2' onfocus="this.blur();"><span>Sign Up</span></button>
            </Link>
        </div>
    )
}

export default Home