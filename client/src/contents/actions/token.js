import {
	SET_JWT_TOKEN,
	CLEAR_JWT_TOKEN
} from "../constants"

const setJwtToken = (token) => {
	return {
		type: SET_JWT_TOKEN,
		token
	}
}

const clearJwtToken = () => {
	return {
		type: CLEAR_JWT_TOKEN
	}
}

export default {
	setJwtToken,
	clearJwtToken
}