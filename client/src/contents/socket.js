import io from 'socket.io-client';
import { getToken } from "./token"
import store from "./store"
import { socketStatusActions } from "./actions"

const socketConfig = (token = null) => { //returns socketio config
	return {
		query: "token=" + token,
		'reconnection': true,
		'reconnectionDelay': 1000,
		'reconnectionDelayMax' : 5000,
		'reconnectionAttempts': 5
	}
}

let socket = io.connect(window.location.protocol + "//" + window.location.host, socketConfig(getToken()))

socket.on("connect", () => {
	store.dispatch(socketStatusActions.setSocketStatusUp())
})

socket.on("error", (msg) => { //this is called when the token is invalid or there is some other error
	store.dispatch(socketStatusActions.setSocketStatusDown())
})

socket.on("disconnect", () => {
	store.dispatch(socketStatusActions.setSocketStatusDown())
})

socket.openConnection = function(token) {
	this.disconnect() //close the connection if open

	/*
	this is a hack to change the jwt token in the query
	when the bug is fixed the command will be this:
	socket.io.opts.query = "token=" + data.data.token
	*/
	this.io = new io.Manager(window.location.protocol + "//" + window.location.host, socketConfig(token));

	this.connect() //open websocket connection
}

socket.closeConnection = function() {
	/*
	same hack as before
	when the bug is fixed the command will be this:
	socket.io.opts.query = "token=" + null
	*/
	this.io = new io.Manager(window.location.protocol + "//" + window.location.host, socketConfig());

	this.disconnect() //close websocket connection
}

export default socket

window.getSocket = () => {
	return socket
}