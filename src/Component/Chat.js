import React from 'react'
import SidePanel from './Sidepanel'
import Profile from './Profile'
import WebSocketInstance from '../WebSocket.js'
import '../assets/Chat.css'
import { connect } from 'react-redux'
WebSocketInstance.connect()
class Chat extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			message: ''

		}
		this.waitForSocketConnection(() => {
			WebSocketInstance.addCallbacks(
				this.setMessage.bind(this),
				this.addMessage.bind(this))
				//this.props.currentUser => daisuke
			WebSocketInstance.fetchMessages(this.props.username)
		})
	}
	waitForSocketConnection(callback) {
		const component = this // this is Chat
        // const socket = this.socketRef
        //const recursion = .waitForSocketConnection
        setTimeout(
            function() {
                if (WebSocketInstance.state() === 1) {
                    console.log('connection is secure')
                    callback()
                    return;
                } else {
                    console.log('waiting for connection ....')
                    component.waitForSocketConnection(callback)
                } 
            }, 100);
	}

	setMessage(messages) {
		this.setState({messages: messages.reverse()})
	}
	
	addMessage(message) {
		// ... means *args
		this.setState({messages: [...this.state.messages, message[0]]})
	}

	renderMessages = (messages) => {
		const currentUser = this.props.username
		return messages.map(message => (
			<li
			key={message.id}
			className={message.author === currentUser ? 'sent': 'replies'}>
			<img src='http://emilcarlsson.se/assets/mikeross.png'/>
			<p>
				{message.content}
				<br/>
				<small>
					{message.timestamp.substring(0,16)}
					{/*{Math.round(new Date().getTime() - new Date(message.timestamp).getTime()/60000)} minutes ago*/}
				</small>
			</p>
			</li>
		))
	}
	
	messageChangeHandler = e => {
		this.setState({message: e.target.value})
	}

	sendMessageHandler = e =>{
		e.preventDefault();
		console.log('username::', this.props.username)
		const messageObject = {
			from: this.props.username,
			content: this.state.message,
			
		}
		if (messageObject.content) {
			console.log(messageObject.content)
			WebSocketInstance.newChatMessage(messageObject);
		    this.setState({
			     message: ''
		})
	}}

    render() {
		const messages = this.state.messages;
        return (
    <div id="frame">
		<div className='content'>
		<Profile/>
		<div className="messages">
			<ul id='chat-log'>
				{messages && this.renderMessages(messages)}
			</ul>
		</div>
		<div className="message-input">
			<form onSubmit={this.sendMessageHandler}>
			<div className="wrap">
			<input onChange={this.messageChangeHandler}
			value={this.state.message}id="chat-message-input" type="text" placeholder="Write your message..." />
			<i className="fa fa-paperclip attachment" aria-hidden="true"></i>
			<button id="chat-message-submit" className="submit">
				<i className="fa fa-paper-plane" aria-hidden="true"></i>
			</button>
			</div>
			</form>
		</div>
		</div>
	</div>
        )

  }
  }

  const mapstateToProps = state => {
    return {
	username: state.auth_reducer.user,
	email: state.auth_reducer.email
}
}
  
  export default connect(mapstateToProps, null)(Chat);

