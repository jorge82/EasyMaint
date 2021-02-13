import React from 'react';

import Typography from '@material-ui/core/Typography';

import Link from 'next/link'


export default   function Copyright(){
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        EasyMaint
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}