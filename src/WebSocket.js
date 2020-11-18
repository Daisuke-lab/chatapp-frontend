class WebSocketService {
    // static is method or instance in the class
    static instance = null;
    // put sth later
    callbacks = {};
    static getInstance() {
        if (!WebSocketService.instace) {
            WebSocketService.instance = new WebSocketService()
        }
        return WebSocketService.instance
    }

    constructor() {
        this.socketRef = null;

    }
    connect() {
        //127.0.0.1:8000
        //localhost:8000
        const path = 'ws://localhost:8000/ws/chat/test/'
        this.socketRef = new WebSocket(path)
        this.socketRef.onopen = () => {
            console.log('open')
        }
        this.socketNewMessage(JSON.stringify({
            // fetch_messages => messages
            command: 'messages'
        }))
        this.socketRef.onmessage = e => {
            this.socketNewMessage(e.data)
        }
        this.socketRef.onclose = () => {
            console.log('close')
            //this.connect()
        }
        this.socketRef.onerror = e => {
            console.log('error in Websocket::',e.message)
        }
    }

    socketNewMessage(data) {
        const parseData = JSON.parse(data)
        const command = parseData.command
        console.log('Parsedata in Websocket::',parseData)
        if (Object.keys(this.callbacks).length === 0) {
            return 
        }
        if (command === 'messages') {
            // as you can seee addCallback, callbacks[command] is function. so you put Parsedata.message(s) in messagesCallback or newMessageCallback
            this.callbacks[command](parseData.messages)
        }
        if (command === 'new_message') {
            this.callbacks[command](parseData.message)
        }
    }

    fetchMessages(username) {
        this.sendMessage({command: 'fetch_messages', username: username})
    }
    
    newChatMessage(message) {
        console.log('newChatMessage::', message)
        this.sendMessage({command: 'new_message',from: message.from, message: message.content})
    }

    addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback
    }

    sendMessage(data) {
        console.log('data in sendMessage',data)
        try {
            this.socketRef.send(JSON.stringify({...data }))
        } catch (err) {
            console.log(err.message)
        } 
    }
    state() {
        return this.socketRef.readyState
    }
}

// WebSocketInstance is new instance 
const WebSocketInstance = WebSocketService.getInstance()

export default WebSocketInstance;