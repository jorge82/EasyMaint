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

import { useDispatch,useSelector } from 'react-redux';
import { login, logout } from '../../redux/actions/auth';
import { useRouter } from 'next/router'

import CopyRight from '../Footer/CopyRIght'
//import backImage from '../public/new_york.png';


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

  const { isLoggedIn,  user } = useSelector(state => state.auth);
  
  const dispatch = useDispatch()

  const router = useRouter()
  useEffect(()=>{
    localStorage.clear();
    console.log("clearing localstorage!!!!!!!")
    dispatch(logout());
  },[])

  useEffect(()=>{
    console.log("is logged in ", isLoggedIn , " user is ", user)
    if (isLoggedIn) {

      //localStorage.setItem("user" , user);
      changeRoute();
    }
   
},[isLoggedIn]);



const changeRoute =()=>{

    router.push('/home');  
}

  const handleLogin= async ()=>{
    if(!email){
      setErrorEmail(true);
      return;
    }
    if(!password){
      setErrorPass(true);
      return;
    }
    const fields={'email':email, 'password': password}
    dispatch(login(fields ));
    
    // if (!user.emailVerified){
    //   alert("Email isn´t verifed, please check your email account");
    //   sendEmailVerification();
    //   return;
    // }
   

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
        <CopyRight />
      </Box>
    </Container>
  );
}