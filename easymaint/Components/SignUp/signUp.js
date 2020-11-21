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

import UserForm  from './UserForm';
import CompanyForm  from './CompanyForm';

import { saveUser, fetchUserByEmail,createUser,saveBusinessWithUser,sendEmailVerification } from '../../DB/users';

function Copyright() {
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {

  const [name, setName]=React.useState('');
  const [lastName, setLastName]=React.useState('');
  const [email, setEmail]=React.useState('');
  const [password, setPassword]=React.useState('');

  const [companyName, setcompanyName]=React.useState('');
  const [city, setCity]=React.useState('');
  const [country, setCountry]=React.useState('');
  const [adress, setAdress]=React.useState('');
  const [zipCode, setZipCode]=React.useState('');
  const [phone, setPhone]=React.useState('');
  const [planType, setPlanType]=React.useState('');

  const [alertExist, setAlertExist]=React.useState(false);

  const classes = useStyles();


  function emailIsValid(email){
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(email)) {
      return false;
    }
    return true;
  }

  const handleRegister=()=>{

    if(! emailIsValid(email)){
        alert('Email invalido');
        return;
      }
  
      if(!name){
        alert('Nombre requerido');
        return;
      }
      if(!lastName){
        alert('Apellido requerido');
        return;
      }
      if(!email){
        alert('Email requerida');
        return;
      }
      if(!password){
        alert('Password requerida');
        return;
      }
      if(!companyName){
        alert('Comany name requerido');
        return;
      }
      if(!city){
        alert('city required requerido');
        return;
      }
      if(!country){
        alert('country requerida');
        return;
      }
      if(!adress){
        alert('adress requerida');
        return;
      }

        const newUser=createUser(email, password);

        newUser.then((resp)=>{
          if (resp==false){
            alert("User already exists!!!");
            return;
          }else{
            try {   
              
                const dataBusiness={
                    bussinessAddress: adress,
                    bussinessName: companyName,
                    city: city,
                    Country: country,
                    phone: phone,
                    zipCode: zipCode,
                    planType: planType
                }
                const dataUser={
                    email: email,
                    name: name,
                    lastName: lastName,
                    password: password,
                    role: 'OWNER '  // the owner is the creator of the account
                }
                //await saveUser(fields, token || '');
                saveBusinessWithUser(dataBusiness, dataUser);
                //router.push(`/signIn`);
            } catch (e) {
            
              alert('Services are not available. Please email admin');
            }

          }
        }
        )
        console.log("user created", newUser);
        
       
   
     
      return;
 
  }

  const setFormValues=(type, value)=>{
    console.log("receibed from child " , type, " ", value)
      switch( type){
          

          case 'firstName': setName( value);
                        break;
          case 'lastName': setLastName( value);
                        break;
          case 'email': setEmail( value);
                        break;
          case 'password': setPassword(value);
                        break;
          
         case 'companyName': setcompanyName( value);
                        break;
          case 'phone': setPhone( value);
                        break;
          case 'zipCode': setZipCode( value);
                        break;
          case 'city': setCity( value);
                        break;
          case 'country': setCountry( value);
                         break;
          case 'adress': setAdress( value);
                        break;
          case 'planType': setPlanType( value);
                        break;
      }
    
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={0}>
                <Grid item xs={12} sm={12} align="center">
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    SignUp
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <CompanyForm sendValues={setFormValues}/>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <UserForm sendValues={setFormValues}/>
                    <Grid item xs={12} align="center">
                   
                    <Button 
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleRegister}
                    >
                     Sign Up
                    </Button>
           
                    </Grid>
                     <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/SignIn" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                     </Grid>
                </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}