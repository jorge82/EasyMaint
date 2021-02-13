import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

//const user = JSON.parse(localStorage.getItem("user"));
const user = null
const initialState = user
  ? { isLoggedIn: true, isRegistered: false, user:user, loginFailed:false }
  : { isLoggedIn: false, isRegistered: false, user: null, loginFailed:false };

export default function (state = initialState, action) {
  const { type, payload } = action;

  console.log("AUTH REDUCER " , action);
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isRegistered: true,
        loginFailed:false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isRegistered: false,
      };
    case LOGIN_SUCCESS:
      
      return {
        ...state,
        isLoggedIn: true,
        isRegistered: false,
        user: payload.user,
        loginFailed:false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isRegistered: false,
        user: null,
        loginFailed:true,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isRegistered: false,
        user: null,
      };
    default:
      return state;
  }
}