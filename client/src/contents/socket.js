import io from 'socket.io-client';
import { getToken } from "./token"
import store from "./store"
import { socketStatusActions } from "./actions"

let socket = io.connect(window.location.protocol + "//" + window.location.host, {
	query: "token=" + getToken(),
	'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax' : 5000,
    'reconnectionAttempts': 5
})

socket.on("connect", () => {
	store.dispatch(socketStatusActions.setSocketStatusUp())
})

socket.on("error", (msg) => { //this is called when the token is invalid or there is some other error
	store.dispatch(socketStatusActions.setSocketStatusDown())
})

socket.on("disconnect", () => {
	store.dispatch(socketStatusActions.setSocketStatusDown())
})

export default socket