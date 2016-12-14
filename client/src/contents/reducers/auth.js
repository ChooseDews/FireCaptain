import {fromJS, Map } from "immutable"

import {
	ADD_AUTH_OBJECT,
	REMOVE_AUTH_OBJECT
} from "../constants"

const initialState = Map({})

const auth = (state = initialState, action) => {
	switch (action.type) {
		case ADD_AUTH_OBJECT: {
			return fromJS(action.user)
		}
		case REMOVE_AUTH_OBJECT: {
			return Map({})
		}
		default: {
			return state
		}
	}
}

export default auth