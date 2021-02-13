import React, {useState,useEffect } from 'react';
import Head from 'next/head'


import SideDrawer from '../src/Components/SideMenu/SideDrawer';
import SignIn from './SignIn'

export default function Home() {

  return (  
    <div>
   
        <SideDrawer/> 
    </div>
  )
}
