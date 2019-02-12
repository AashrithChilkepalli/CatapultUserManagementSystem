import axios from "axios";
import AuthToken from "../utils/AuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";


export const registerUser = (userData, history) => dispatch => {

  //We used a proxy in package.json, So we use it to hit the server side API --> We do not have to include the entire URL
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) 
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {  
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      AuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log("Decoded", decoded)
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      // dispatching the actions to reducers
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// removing the current token 
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  AuthToken(false);
  dispatch(setCurrentUser({}));
};