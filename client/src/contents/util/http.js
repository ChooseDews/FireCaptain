//http wrapper for handling auth
import * as axios from "axios"
import storeHolder from "../store"
import { replace } from 'react-router-redux'

const mainUrl = "" //base url for routes

const errorHandler = (error) => { //handler for unauthorized or other errors
	if (error.response) {
		if (error.response.status == 401) { //not logged in
			store.dispatch(replace("/login"))
		} else if (error.response.status == 403) { //not authorized
			store.dispatch(replace("/unauthorized"))
		} else { //some other error
			store.dispatch(replace("/error"))
		}
	} else {//some other error
		store.dispatch(replace("/error"))
	}
}

const makeConfig = (headers) => { //takes in provided headers and makes axios config object
	let token = storeHolder.store.getState().token //get jwt token
	if (token != null) { //if token exists then add it to headers
		headers = {
			"x-access-token": token,
			...headers
		}
	}

	return {
		headers
	}
}

const http = {
	get: (url, headers = {}) => {
		return axios.get(mainUrl + url, makeConfig(headers)).catch(errorHandler)
	},
	post: (url, params = {}, headers = {}) => {
		return axios.post(mainUrl + url, params, makeConfig(headers)).catch(errorHandler)
	}
}

export default http
