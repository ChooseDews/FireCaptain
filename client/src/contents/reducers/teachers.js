import { List, fromJS, Map } from "immutable"

import {
	ADD_TEACHERS,
	REMOVE_TEACHERS,
	ADD_TEACHER,
	REMOVE_TEACHER
} from "../constants"

const initialState = List([])

const teachers = (state = [], action) => {
	switch(action.type) {
		case ADD_TEACHERS: {
			return fromJS(action.teachers)
		}
		case REMOVE_TEACHERS: {
			return List([])
		}
		case ADD_TEACHER: {
			return state.push(Map({
				id: action.id,
				name: action.name,
				email: action.email
			}))
		}
		case REMOVE_TEACHER: {
			return state.filter((teacher) => {
				return teacher.get('id') != action.id
			})
		}
		default: {
			return state
		}
	}
}

export default teachers