import { ADD_INITIAL_TEACHERS } from "../constants"

import * as axios from "axios"

export default function getTeachers() {
	return function(dispatch) {
		return axios.get("https://jsonplaceholder.typicode.com/users").then(
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