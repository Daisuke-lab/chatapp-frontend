import React from 'react';
import { connect } from 'react-redux';
import Hoc from '../hoc/Layout';
import '../assets/Profile.css'

const Profile = (props) => {
        return (
            <div className="contact-profile">
                    <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                    <p>{props.username}</p>
                    <div className="social-media">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                    </div>
            </div>
        )
    }


const mapStateToProps = state => {
    return {
        username: state.auth_reducer.user
    }
}
    
export default connect(mapStateToProps, null)(Profile);

