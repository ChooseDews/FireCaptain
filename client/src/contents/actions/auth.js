import {
	ADD_AUTH_OBJECT,
	REMOVE_AUTH_OBJECT
} from "../constants"

import { http } from "../util"
import store from "store2"

function login(email, password) {
	return function(dispatch) {
		return http.post("/api/auth/login", {
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
				return data
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
