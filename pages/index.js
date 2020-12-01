import React, {useState,useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Home from './home'
import SignIn from './SignIn'
import Pricing from './pricing'

import Grid from '@material-ui/core/Grid';
import {useRouter} from 'next/router';


export default function index() {


  const [isLogIn, setLogIn]= useState(false);
  const router = useRouter()

  useEffect(()=>{
    var logedIn= localStorage.getItem('isLogIn') 
    console.log(' esta logeado', logedIn);
    if(JSON.parse(logedIn)===true){
        //setLogIn(true);
      }
  },[isLogIn])


  //  if(!isLogIn) {
  //    router.push('/SingIn');
  //  } 
  return (  

    
  <div> 
  <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}
>

  <Grid item xs={3}>
  
  { !isLogIn && <SignIn></SignIn>}
    
    { isLogIn && (<Home></Home>)}
    </Grid>   

</Grid> 
</div>

   
    

    

  )
}
