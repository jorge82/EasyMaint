import React ,{useState, useEffect} from 'react';
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
import Link from 'next/link'
import {signIn, signOut , fetchUserByEmail,sendEmailVerification} from '../DB/users';
import {getBussinessData} from '../DB/bussiness';
import { useRouter } from 'next/router'
//import backImage from '../public/new_york.png';

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
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
    //backgroundImage:`url(${"/new_york.png"})`
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  register: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function SignIn() {
  const [email, setEmail]= useState("ajorge89@hotmail.com");
  const [password, setPassword]= useState('12345678');
  const [alertNotExist, setAlertNotExist]=React.useState(false);
  const [errorEmail, setErrorEmail]=React.useState(false);
  const [errorPass, setErrorPass]=React.useState(false);


  const router = useRouter()
  useEffect(()=>{
    signOut();
    localStorage.setItem('isLogIn',false);
  },[])

  const handleLogin= async ()=>{
    if(!email){
      setErrorEmail(true);
      return;
    }
    if(!password){
      setErrorPass(true);
      return;
    }
    const user= await signIn(email, password);
    console.log("user readed", user)
    if (!user){

      alert("User doesn´t exists");
      return;
    }
    // if (!user.emailVerified){
    //   alert("Email isn´t verifed, please check your email account");
    //   sendEmailVerification();
    //   return;
    // }
    
    if(!user){
      alert('User not valid');
    }
    else{
      
        try{
      const userData= await fetchUserByEmail(email)
            
          localStorage.setItem('userData',JSON.stringify(userData));
          localStorage.setItem('isLogIn',true);
          console.log("user:", userData)
          const bussinesData= await getBussinessData(userData.bussinessID)

            localStorage.setItem('bussinessData',bussinesData);
            
            router.push('/home')
        }
      
        catch(error){
          console.log("error", error);
          alert("Error fetching user or bussines data ");
      };
         
      
     
      
      
      

              
          
      
    }

    
    //;
  //   fetchUserByEmail(email).then(function(doc) {
  //     if (doc.exists) {
  //         if(doc.data().password!= password){
  //           setErrorPass(true);
  //           //alert('Password invalida');

  //         }else{
  //           localStorage.setItem('isLogIn',true);
  //           console.log("login!!!")
            
  //           router.push('/home')
  //         }
  //     } else {
  //         setAlertNotExist(true);  
  //         setErrorEmail(true);
  //         //alert('usuario no encontrado');
  //     }
  // }).catch(function(error) {
  //         console.log("Error getting document:", error);
  // });
  return;

  }
  const handleRegister = ()=>{
    
    router.push('/signUp/signUp')
  }

  const handleChange=(event)=>{

      switch( event.target.name){

          case 'email': setEmail( event.target.value);
                        setErrorEmail(false);
                        break;
          case 'password': setPassword( event.target.value);
                        setErrorPass(false);
                        break;
      }
    
  }
  
  
  const classes = useStyles();




  return (
    <Container component="main" maxWidth="xs" >
  
      <CssBaseline />
      <div className={classes.paper}>
     
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value= {email}
            onChange={handleChange}
            autoFocus
            error={errorEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value= {password}
            onChange={handleChange}
            error={errorPass}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button 
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Button 
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.register}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            {/* <Grid item>
              <Link href="/signUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}