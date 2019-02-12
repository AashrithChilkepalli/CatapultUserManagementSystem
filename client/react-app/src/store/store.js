import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import combinedReducer from "../reducers";

const initialState = {};
const middleware = [thunk];


// Global Store
const store = createStore(
  combinedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
  )
);

export default store;