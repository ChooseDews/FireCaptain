import {combineReducers} from "redux"

import teachersReducer from "./teachers"

const mainReducer = combineReducers({
	teachers: teachersReducer
})

export default mainReducer