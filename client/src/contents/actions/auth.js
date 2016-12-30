import { http } from "../util"
import store from "store2"
import moment from "moment"

import {
	ADD_AUTH_OBJECT,
	REMOVE_AUTH_OBJECT,
	SET_JWT_TOKEN,
	CLEAR_JWT_TOKEN
} from "../constants"

import socket from "../socket"

function login(email, password) {
	return (dispatch) => {
		return http.post("/api/auth/login", {
			email,
			password
		}).then(
			(data) => {
				var {
					data
				} = data
				if (data.success) {
					socket.openConnection(data.data.token) //reconnects socket
					store.set("token", data.data.token)
					store.set("timestamp", moment(new Date()).unix()) //sets timestamp of token
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
	socket.closeConnection() //close socket connection
	//remove token and timestamp
	store.remove("token")
	store.remove("timestamp")
	return [{
			type: REMOVE_AUTH_OBJECT
		},
		{
			type: CLEAR_JWT_TOKEN
		}
	]
}

function addAuthObject(user) {
	return {
		type: ADD_AUTH_OBJECT,
		user
	}
}

function removeAuthObject() {
	return {
		type: REMOVE_AUTH_OBJECT
	}
}

export default {
	login,
	logout,
	addAuthObject,
	removeAuthObject
}
