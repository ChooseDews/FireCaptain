import {
	ADD_INITIAL_TEACHERS,
	REMOVE_TEACHERS
} from "../constants"

const teachersReducer = (state = [], action) => {
	switch(action.type) {
		case ADD_INITIAL_TEACHERS: {
			return action.teachers
		}
		case REMOVE_TEACHERS: {
			return []
		}
		default: {
			return state
		}
	}
}

export default teachersReducer