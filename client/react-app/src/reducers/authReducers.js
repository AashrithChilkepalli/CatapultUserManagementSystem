import {
    SET_CURRENT_USER,
    USER_LOADING
  } from "../actions/types";
  const isEmpty = require("is-empty");

  const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    isAdmin: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload,
          isAdmin: action.payload.id === "admin" && action.payload.name === "admin" ? true : false
        };
        
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }