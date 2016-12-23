import store from "store2"

export const getToken = () => {
	return store.get("token")
}

export const getTimestamp = () => {
	return store.get("timestamp")
}

export const clearTokenAndTimestamp = () => {
	store.remove("token")
	store.remove("timestamp")
}