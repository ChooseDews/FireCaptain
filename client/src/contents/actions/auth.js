import { http } from "../util"
import store from "store2"
import moment from "moment"
import io from 'socket.io-client';

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
					/*
					this is a hack to change the jwt token in the query
					when the bug is fixed the command will be this:
					socket.io.opts.query = "token=" + data.data.token
					*/
					socket.io = new io.Manager(window.location.protocol + "//" + window.location.host, {
						query: "token=" + data.data.token,
						'reconnection': true,
						'reconnectionDelay': 1000,
						'reconnectionDelayMax': 5000,
						'reconnectionAttempts': 5
					});

					socket.connect() //open websocket connection
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
	/*
	this is a hack to change the jwt token in the query
	when the bug is fixed the command will be this:
	socket.io.opts.query = "token=" + data.data.token
	*/
	socket.io = new io.Manager(window.location.protocol + "//" + window.location.host, {
		query: "token=" + null,
		'reconnection': true,
		'reconnectionDelay': 1000,
		'reconnectionDelayMax': 5000,
		'reconnectionAttempts': 5
	});

	socket.disconnect() //close websocket connection
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
