

export function waitForSocketConnection(callback, WebSocketInstance) {
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
                waitForSocketConnection(callback, WebSocketInstance)
            } 
        }, 100);
}


export const sendMessageHandler = (e, WebSocketInstance, props, message, images, files) =>{
    console.log('SEND MESSAGEHANDLER')
    console.log('files::',files)
    e.preventDefault();
    let files_list = images.concat(files)
    // var i
    // for (i=0; i<files.length; i++) {
    //     files_list.push(files[i].file)
    // }
    // files_list = files_list.concat(images)
    console.log('files_list',files_list)
    const messageObject = {
        from: props.name,
        content: message,
        ChatID: props.ChatID,
        files: files_list
        
    }
    WebSocketInstance.newChatMessage(messageObject);
    // if (messageObject.content) {
    //     WebSocketInstance.newChatMessage(messageObject);
    // }
}

export function initializeChat(props, WebSocketInstance) {
    waitForSocketConnection(() => {
        WebSocketInstance.addCallbacks(
            props.fetch_messages,
            props.new_message)
        WebSocketInstance.fetchMessages(props.name, props.ChatID)
    }, WebSocketInstance)
}
