import {
	GET_MAP,
	UPDATE_MAP
} from "../constants"

import { http } from "../util"



function getMap() {
	return (dispatch) => {
		return http.get("/api/school/map").then(
			(data) => {
				dispatch({
					type: GET_MAP,
					map:data.data
				})
				return data
			}
		)
	}
}

function updateMap(map) {
	return (dispatch) => {
		return http.post("/api/school/login", {
			map
		}).then(
			(data) => {
				dispatch({
					type: UPDATE_MAP,
					map:data.data
				})

				return data
			}
		)
	}
}



export default {
	getMap,
	updateMap
}
