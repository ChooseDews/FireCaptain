import { 
	ADD_TEACHERS,
	REMOVE_TEACHERS,
	ADD_TEACHER,
	REMOVE_TEACHER
} from "../constants"

import * as axios from "axios"

function getTeachers() {
	return function(dispatch) {
		return axios.get("https://jsonplaceholder.typicode.com/users").then(
			(data) => {
				dispatch({
					type: ADD_TEACHERS,
					teachers:data.data
				})
			},
			(error) => {
				//there was an error getting the teachers. trigger a dispatch
			}
		)
	}
}

function removeTeachers() {
	return {
		type: REMOVE_TEACHERS
	}
}

function addTeacher(teacher) {
	return {
		type: ADD_TEACHER,
		id: teacher.id,
		name: teacher.name,
		email: teacher.email
	}
}

function removeTeacher(id) {
	return {
		type: REMOVE_TEACHER,
		id
	}
}

export default {
	getTeachers,
	addTeacher,
	removeTeacher,
	removeTeachers
}