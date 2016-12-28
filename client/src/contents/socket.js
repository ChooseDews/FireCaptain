import io from 'socket.io-client';
import { getToken } from "./token"

export let socket = io.connect(window.location.protocol + "//" + window.location.host, {
	query: "token=" + getToken()
})

socket.on("connect", function() {
	//the token was valid
})

socket.on("error", function(msg) {
	if (msg.code == "invalid_token") {
		//the token was invalid
	}
})

export function disconnectSocket() {
	socket.disconnect()
}

export function connectSocket(token) {
	if (!socket.connected) {
		socket = io.connect(window.location.protocol + "//" + window.location.host, {
			query: "token=" + token
		})
	}
}

window.getSocket = () => {
	return socket
}