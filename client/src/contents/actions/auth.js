import {
	ADD_AUTH_OBJECT,
	REMOVE_AUTH_OBJECT,
	SET_JWT_TOKEN,
	CLEAR_JWT_TOKEN
} from "../constants"

import { http } from "../util"
import store from "store2"

function login(email, password) {
	return (dispatch) => {
		return http.post("/api/auth/login", {
			email,
			password
		}).then(
			(data) => {
				var { data } = data
				if (data.success) {
					store.set("user", data.data) //sets local storage
					store.set("token", data.data.token)
					dispatch({ //set user in state
						type: ADD_AUTH_OBJECT,
						user: data.data
					})
					dispatch({ //set token in state
						type: SET_JWT_TOKEN,
						token: data.data.token
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
	store.remove("token")
	return [{
		type: REMOVE_AUTH_OBJECT
	},
	{
		type: CLEAR_JWT_TOKEN
	}]
}

export default {
	login,
	logout
}
