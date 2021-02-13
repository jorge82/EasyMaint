import { combineReducers } from "redux";
import auth from "./authReducer";
// import categories from "./categoriesReducer"
// import products from "./productsReducer"
import message from "./messageReducer";

export default combineReducers({
  auth,
  message,
});