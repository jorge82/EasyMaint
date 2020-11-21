import React ,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from 'next/link';




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'right',
   
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CompanyForm(props) {

  const [companyName, setCompanyName]=React.useState('');
  const [city, setCity]=React.useState('');
  const [country, setCountry]=React.useState('');
  const [adress, setAdress]=React.useState('');
  const [zipCode, setZipCode]=React.useState('');
  const [phone, setPhone]=React.useState('');
  const [planType, setPlanType]=React.useState('');

  const classes = useStyles();




  const handleChange=(event)=>{

      switch( event.target.name){

          case 'companyName':setCompanyName( event.target.value);
                            props.sendValues(event.target.name,event.target.value)
                            break;
          case 'phone':     setPhone( event.target.value);
                            props.sendValues(event.target.name,event.target.value)
                            break;
          case 'zipCode':   setZipCode( event.target.value);
                            props.sendValues(event.target.name,event.target.value)
                            break;
          case 'city':      setCity( event.target.value);
                            props.sendValues(event.target.name,event.target.value)
                            break;
          case 'country':   setCountry( event.target.value);
                            props.sendValues(event.target.name,event.target.value)
                            break;
          case 'adress':    setAdress( event.target.value);
                            props.sendValues(event.target.name,event.target.value)
                            break;
          case 'planType':  setPlanType( event.target.value);
                            props.sendValues(event.target.name,event.target.value)
                            break;
         
      }
    
  }

  return (
    <Container component="main" >
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5">
         Company 
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="companyName"
                variant="outlined"
                required
                fullWidth
                id="companyName"
                label="Comapny Name"
                value= {companyName}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone number"
                name="phone"
                value= {phone}
                onChange={handleChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="adress"
                label="Adress"
                name="adress"
                value= {adress}
                onChange={handleChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="country"
                label="Country"
                id="country"
                value= {country}
                onChange={handleChange}
                autoComplete="lname"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="city"
                label="City"
                id="city"
                value= {city}
                onChange={handleChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="zipCode"
                label="Zip Code"
                id="zipCode"
                value= {zipCode}
                onChange={handleChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="planType"
                label="Plan"
                id="planType"
                value= {planType}
                onChange={handleChange}
                autoComplete="lname"
              />
            </Grid>
           
          </Grid>
         
        </form>
      </div>
     
    </Container>
  );
}