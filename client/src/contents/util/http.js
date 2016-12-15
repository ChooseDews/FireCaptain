//http wrapper for handling auth
import * as axios from "axios"
import store from "../store"
import { replace } from 'react-router-redux'

const mainUrl = "http://localhost:3000" //base url for routes

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

const setToken = () => { //sets access token
	let token = store.getState().user.get("token") //get jwt token
	if (token != null) {
		axios.defaults.headers.common['x-access-token'] = token;
	} else {
		axios.defaults.headers.common['x-access-token'] = undefined;
	}
}

const http = {
	get: (url, headers = {}) => {
		setToken()
		return axios.get(mainUrl + url, headers).catch(errorHandler)
	},
	post: (url, params = {}, headers = {}) => {
		setToken()
		return axios.post(mainUrl + url, params, headers).catch(errorHandler)
	}
}

export default http