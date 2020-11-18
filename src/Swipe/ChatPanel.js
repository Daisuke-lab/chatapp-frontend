import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import '../assets/ChatPanel.css'
import {Link, useHistory} from 'react-router-dom'
//you need to wrap name, message, image, timestamp by {} otherwise, it would cause the error that is use array instead...
function ChatPanel({name, message, image, timestamp}) {
    const link = '/chat/test'
    return (
        <Link to={link}>
        <div className='chatpanel'>
            <Avatar className='chatpanel_image' alt={name}
            src={image}/>
            <div className='chatpanel_detail'>
                <h2>{name}</h2>
                <p>{message}</p>
            </div>
            <p className='chatpanel_timestamp'>{timestamp}</p>
        </div>
        </Link>
    )
}

export default ChatPanel
