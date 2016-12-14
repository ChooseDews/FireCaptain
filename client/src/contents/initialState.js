import { fromJS } from "immutable"
import store from "store2"

let initialState;

let user = store.get("user")

if (user) { //puts user data in initial state is user is logged in
	initialState = {
		user: fromJS(user)
	}
} else {
	initialState = {}
}

export default initialState

window.magic = store