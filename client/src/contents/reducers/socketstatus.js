import {
	SET_SOCKET_STATUS_DOWN,
	SET_SOCKET_STATUS_UP
} from "../constants"

const socketStatus = (state = true, action) => {
	switch(action.type) {
		case SET_SOCKET_STATUS_UP: {
			return true
		}
		case SET_SOCKET_STATUS_DOWN: {
			return false
		}
		default: {
			return state
		}
	}
}

export default socketStatus