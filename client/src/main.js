import 'babel-polyfill';

import * as axios from "axios";
import moment from "moment"

import { getToken, getTimestamp, clearTokenAndTimestamp } from "./contents/token" //function to get jwt token
import loadApp from "./loadapp"

//get jwt token and timestamp
let token = getToken()
let timestamp = getTimestamp()

if (token && timestamp) {
	//get the time that the token has been used
	let currentTime = moment(new Date())
	var tokenDuration = moment.duration(currentTime.diff(moment.unix(timestamp))).asHours();
	if (tokenDuration >= 48) { //token has expired
		clearTokenAndTimestamp()
	}
}

if (token && tokenDuration < 48) { //if user is logged in
	axios.get("/api/auth/me", {
		headers: {
			"x-access-token": token,
		}
	}).then(loadApp).catch(loadApp)
} else {
	loadApp({response: true}) //pass in that there is no token
}