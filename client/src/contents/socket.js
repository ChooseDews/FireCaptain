import io from 'socket.io-client';
import { getToken } from "./token"

const createSocketInstance = (token = getToken()) => { //creates a new socket instance
	let socket = io.connect(window.location.protocol + "//" + window.location.host, {
		query: "token=" + token
	})

	socket.on("connect", () => {
		//the token was valid
	})

	socket.on("error", (msg) => {
		if (msg.code == "invalid_token") {
			//the token was invalid
		}
	})

	socket.on("disconnect", () => {
		alert("goodbye")
	})
	
	return socket
}

let socket = createSocketInstance() //initial socket instance

export function disconnectSocket() {
	socket.disconnect()
}

export function connectSocket(token) {
	if (!socket.connected) {
		socket = createSocketInstance(token)
	}
}

window.getSocket = () => {
	return socket
}