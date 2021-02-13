import React from 'react';
import Head from 'next/head';
import Login from '../src/Components/Auth/Login';
const index = () => {
 
  return (
    <div>
      <Head>
        <title>EasyMaint</title>
      </Head>
      <Login />
    </div>
  );
};

export default index;
