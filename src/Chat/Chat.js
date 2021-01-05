import { connect } from 'react-redux'
import WebSocketInstance from './WebSocket.js'
import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import SpaIcon from '@material-ui/icons/Spa';
import { IconButton } from '@material-ui/core';
import {Link} from 'react-router-dom'
import '../assets/Chat/Chat.css'
import {sendMessageHandler, initializeChat} from './MessageHandler'
import * as chat_actions from '../store/actions/chat_action'
import FriendProfile from './FriendProfile'
import { time_orderer } from "./TimeHandler";




function ChatScreen(props) {
    const [text, setText] = useState('')
    const [popup, setPopup] = useState(false)
    const [sendingImages, setSendingImages] = useState([])
    const [sendingFiles, setSendingFiles] = useState([])
    const [input, setInput] = useState('')
    const [allContents, setAllContents] = useState([])

    useEffect(() => {
        console.log(props.ChatID)
        initializeChat(props, WebSocketInstance)
        WebSocketInstance.connect(props.ChatID)
        setAllContents(...allContents, ...time_orderer(props.files, props.messages))
    }, [props.ChatID])

    function getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        }; 
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    let idCardBase64 = '';
    const image_handler = (e) => {
        getBase64(e.target.files[0], (result) => {
            idCardBase64 = result;
            console.log(idCardBase64)
            setSendingImages([...sendingImages,{'name':e.target.files[0].name, 'file':idCardBase64}])
        });
    }

    const file_handler = (e) => {
        getBase64(e.target.files[0], (result) => {
            idCardBase64 = result;
            console.log(idCardBase64)
            setSendingFiles([...sendingFiles,{'name':e.target.files[0].name, 'file':idCardBase64}])
        });
    }




    const onSubmit = e => {
        e.preventDefault()
        if (text > 0 || sendingImages.length > 0 || sendingFiles.length > 0) {
            sendMessageHandler(e, WebSocketInstance, props, text, sendingImages, sendingFiles)
            console.log('submitted')
        }
        setInput('')
        setSendingImages([])
        setSendingFiles([])
    }

    function onOpen() {
        setPopup(true)
    }
    function onClose() {
        setPopup(false)
    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div className='chatScreen'>
            <header className='chatScreen_header'>
            <Link to='/chatpanel'>
                    <IconButton id='chatScreen_header_icon'>
                        <ArrowBackIosIcon style={{fontSize: '30px'}}/>
                    </IconButton>
                </Link>
            </header>
            <div style={{position:'sticky', top:'30%', zIndex:0}}>
            <SpaIcon id='chatScreen_logo'/>
            </div>
            <FriendProfile onClose={onClose} popup={popup} friend_profile_id={props.friend_profile_id}/>
            <div style={{textAlign: 'center'}}>
            <p1 className='chatScreen_match'>YOU MATCHED WITH {props.friend} ON {props.when_matched}</p1>
            </div>
            <ul className='chatScreen_messages'>
            {props.messages.map(message => message.name !== props.name? 
                (
                <div className='chatScreen_message'>
                    <Avatar className='chatScreen_image'
                    alt={message.name} src={props.friend_image} onClick={onOpen}/>
                    <p className='chatScreen_reply'>{message.content}<br/>
                    <small>
					{message.timestamp.substring(0,16)}
				    </small></p>
                </div>
                ) : (
                    <div className='chatScreen_message'>
                    <p className='chatScreen_sent'>{message.content}<br/>
                    <small>
					{message.timestamp.substring(0,16)}
			         </small></p>
                    </div>
                ))
            }
            </ul>

        <div>
            <form className='chatScreen_input' onSubmit={onSubmit}>
                <label for="file-upload" class="custom-file-upload" style={{marginTop: 'auto'}}>
                    <AttachFileIcon/>
                </label>
                <input type='file' name='image' accept="audio/*, .pdf, .txt, .gif, .doc, .xls, .ppt, .pps" size="60"
                id="file-upload" onChange={file_handler}/>

                
                <label for="image-upload" class="custom-file-upload" style={{marginTop: 'auto'}}>
                    <ImageIcon/>
                </label>
                <div className='chatScreen_input_field' style={sendingImages.length>0?{border:'solid aqua'}:{}}>
                    {sendingFiles.length>0? sendingFiles.map(file =>
                        <div className='chatScreen_file_outer'>
                            {file.name}
                        </div>):<></>}
                    {sendingImages.length > 0? sendingImages.map(image => <img src={image}/>):<></>}
                    <input type='file' name='image' accept="image/*, video/*" size="60"
                    id="image-upload" onChange={image_handler}/>
                    <TextareaAutosize className='chatScreen_input_text' rowsMax={4} placeholder="Message" onChange={onChange}/>
                </div>
                <button className='chatScreen_submit' type='submit'>SEND</button>
            </form>
        </div>
    </div>
    )
}

const mapstateToProps = (state, objects) => {
    return {
        name: state.auth_reducer.name,
        ChatID: objects.match.params.ChatID,
        friend: objects.match.params.friend,
        friend_image: state.chat_reducer.friend_image,
        when_matched: state.chat_reducer.when_matched,
        friend_profile_id: state.chat_reducer.friend_profile_id,
        messages: state.chat_reducer.messages,
        files: state.chat_reducer.files

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetch_messages: (messages) => dispatch(chat_actions.setMessages(messages)),
        new_message: (message) => dispatch(chat_actions.addMessage(message))
    }
}


export default connect(mapstateToProps, mapDispatchToProps)(ChatScreen)
