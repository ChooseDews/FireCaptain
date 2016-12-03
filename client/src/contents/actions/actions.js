import { ADD_INITIAL_TEACHERS } from "../constants/constants"

import * as axios from "axios"

function getTeachers() {
	return axios.get("https://jsonplaceholder.typicode.com/users")
}

export function updateTeachers() {
	return function(dispatch) {
		return getTeachers().then(
			(data) => {
				console.log(data)
				dispatch({
					type: ADD_INITIAL_TEACHERS,
					teachers:data.data
				})
			},
			(error) => {
				//there was an error getting the teachers. trigger a dispatch
			}
		)
	}
}