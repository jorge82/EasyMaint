import React, {useState,useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Home from './home'
import SignIn from './SignIn'
import Pricing from './pricing'
export default function index() {

  const [isLogIn, setLogIn]= useState(false);

  useEffect(()=>{
    var logedIn= localStorage.getItem('isLogIn') 
    console.log(' esta logeado', logedIn);
    if(JSON.parse(logedIn)===true){
        //setLogIn(true);
      }
  },[isLogIn])


  
  return (  
    <div>
    {/* { !isLogIn && <Pricing></Pricing>} */}
     { !isLogIn && (<SignIn></SignIn>)} 
    { isLogIn && (<Home></Home>)}
    </div>
  )
}
