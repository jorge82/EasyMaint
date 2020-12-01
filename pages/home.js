import React, {useState,useEffect } from 'react';
import Head from 'next/head'


import SideDrawer from '../Components/SideMenu/SideDrawer';
import SignIn from './SignIn'

export default function Home() {

  const [isLogIn, setLogIn]= useState(false);

  useEffect(()=>{
    var logedIn= localStorage.getItem('isLogIn') 
    console.log(' esta logeado', logedIn , logedIn==true);
    if(JSON.parse(logedIn)===true){
        setLogIn(true);
      }
  },[isLogIn])


  
  return (  
    <div>
   
    { isLogIn && (<SideDrawer/> )}
    </div>
  )
}
