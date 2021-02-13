import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
  import { authenticateUser, getUserData,signOut, saveBusinessWithUser } from '../../DB/users';
  

  export const login =   ({email, password}) => (dispatch) => {
    var userData={};
    console.log("user action login reciebed" , email, password);
    
    authenticateUser({email, password})
    .then((resp)=>{
      console.log("login success:" , resp);
      if(resp){
        userData= getUserData(email)
        .then((data)=>{
           console.log("user data is" ,data);
           dispatch({
               type: LOGIN_SUCCESS,
               payload: { user:data},
             });
   
        })
         
       }else{

           dispatch({
               type: LOGIN_FAIL,
             });
             const message="User not founded"
             dispatch({
               type: SET_MESSAGE,
               payload: message,
             });
             alert('Service failed. Notify admin');
             
       }
    })  
   
    
  };
  
  export const logout = () => (dispatch) => {
  
   const response=signOut();
   if(response)
   console.log("user action logging out");
    dispatch({
      type: LOGOUT,
    });
  };

  export const registerBussinessAndUser =   (businessData, userData) => (dispatch) => {
   
    console.log("user action registatrion reciebed" , businessData, userData);
    
     saveBusinessWithUser(businessData, userData)
    .then((resp)=>{
      console.log("register status:" , resp);
      if(resp){
        const message="Registration success"
           dispatch({
               type: REGISTER_SUCCESS,
             });
   
        
         
       }else{

           dispatch({
               type: REGISTER_FAIL,
             });
             const message="Registration failed"
             dispatch({
               type: SET_MESSAGE,
               payload: message,
             });
             alert('Service failed. Notify admin');
             
       }
    })  
   
    
  };

