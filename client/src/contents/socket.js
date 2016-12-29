import io from 'socket.io-client';
import { getToken } from "./token"
import storeHolder from "./store"
import { socketStatusActions } from "./actions"

export let socket = null; //creates socket variable

export const createSocketInstance = (token = getToken()) => { //creates a new socket instance
	let localSocketInstance = io.connect(window.location.protocol + "//" + window.location.host, {
		query: "token=" + token
	})

	localSocketInstance.on("connect", () => {
		storeHolder.store.dispatch(socketStatusActions.setSocketStatusUp())
	})

	localSocketInstance.on("error", (msg) => {
		if (msg.code == "invalid_token") {
			storeHolder.store.dispatch(socketStatusActions.setSocketStatusDown())
		}
	})

	localSocketInstance.on("disconnect", () => {
		storeHolder.store.dispatch(socketStatusActions.setSocketStatusDown())
	})

	socket = localSocketInstance
	
	return localSocketInstance
}

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