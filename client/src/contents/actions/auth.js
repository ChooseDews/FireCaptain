import {
	ADD_AUTH_OBJECT,
	REMOVE_AUTH_OBJECT
} from "../constants"

import * as axios from "axios"
import store from "store2"

function login(email, password) {
	return function(dispatch) {
		return axios.post("http://localhost:3000/api/auth/login", {
			email,
			password
		}).then(
			(data) => {
				var { data } = data
				if (data.success) {
					store.set("user", data.data) //sets local storage
					dispatch({
						type: ADD_AUTH_OBJECT,
						user: data.data
					})
				} else {
					//there was an error logging in. Trigger dispatch
				}
			},
			(error) => {
				//there was an error logging in. Trigger dispatch
			}
		)
	}
}

function logout() {
	store.remove("user")
	return {
		type: REMOVE_AUTH_OBJECT
	}
}

export default {
	login,
	logout
}
