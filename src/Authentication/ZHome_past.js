import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar.js'

function clickhandler(e) {
    if (e.isTrusted) {
        
    }
} 
const Home = () => (
    <div className='container'>
        <Navbar/>
        <div class="jumbotron mt-5">
        <h1 class="display-4">Welcome</h1>
        <p class="lead">This is authentication system.</p>
        <hr class="my-4"/>
        <p>Click the login button</p>
        <Link class="btn btn-primary btn-lg" to='/login' role="button" onClick={clickhandler}>Sign in</Link>
        </div>
    </div>
)

export default Home