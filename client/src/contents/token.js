import store from "store2"

const getToken = () => {
	return store.get("token")
}

export default getToken