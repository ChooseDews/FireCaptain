import {
	SET_SOCKET_STATUS_DOWN,
	SET_SOCKET_STATUS_UP
} from "../constants"

const setSocketStatusDown  = () => {
	return {
		type: SET_SOCKET_STATUS_DOWN
	}
}

const setSocketStatusUp = () => {
	return {
		type: SET_SOCKET_STATUS_UP
	}
}

export default {
	setSocketStatusUp,
	setSocketStatusDown
}