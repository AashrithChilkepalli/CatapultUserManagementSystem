import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";


// index.js acts as the default for this folder when imported
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});