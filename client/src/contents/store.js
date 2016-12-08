import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk" //used for async ajax redux

import mainReducer from "./reducers"

const store = createStore(mainReducer, applyMiddleware(thunk))

export default store
