import {
	SET_JWT_TOKEN,
	CLEAR_JWT_TOKEN
} from "../constants"

const token = (state = "", action) => {
	switch (action.type) {
		case SET_JWT_TOKEN: {
			return action.token
		}
		case CLEAR_JWT_TOKEN: {
			return ""
		}
		default: {
			return state
		}
	}
}

export default token