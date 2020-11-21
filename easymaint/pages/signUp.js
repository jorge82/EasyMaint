
import React, {useState,useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import DashBoard from '../dashboard/Dashboard'
import SignIn from './SignIn'
import Pricing from './pricing'
import SignUp from '../Components/SignUp/signUp';
export default function Register() {

 

  
  return (  
    <div>
    <SignUp/>
    </div>
  )
}






















// import React ,{useState} from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import Link from 'next/link';

// import { saveUser, fetchUserByEmail,createUser,sendEmailVerification } from '../DB/users';

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         EasyMaint
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignUp() {

//   const [name, setName]=React.useState('');
//   const [lastName, setLastName]=React.useState('');
//   const [email, setEmail]=React.useState('');
//   const [password, setPassword]=React.useState('');
//   const [alertExist, setAlertExist]=React.useState(false);

//   const classes = useStyles();


//   function emailIsValid(email){
//     var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//     if (!pattern.test(email)) {
//       return false;
//     }
//     return true;
//   }

//   const handleRegister=()=>{

//     if(! emailIsValid(email)){
//       alert('Email invalido');
//       return;
//     }

//     if(!name){
//       alert('Nombre requerido');
//       return;
//     }
//     if(!lastName){
//       alert('Apellido requerido');
//       return;
//     }
//     if(!email){
//       alert('Email requerida');
//       return;
//     }
//     if(!password){
//       alert('Password requerida');
//       return;
//     }
//         const id=email
   
//         const data = {
//           firstName: name,
//           lastName: lastName,
//           password: password
//         }

//         const newUser=createUser(email, password);

//         newUser.then((resp)=>{
//           if (resp==false){
//             alert("User already exists!!!")
//           }
//         }
//         )
//         console.log("user created", newUser);
        
       
   
//       //   fetchUserByEmail(email).then(function(doc) {
//       //     if (doc.exists) {
//       //         setAlertExist(true);  
//       //     } else {
//       //         saveUser(email,data);
//       //         localStorage.setItem('isLogIn',true);
//       //     }
//       // }).catch(function(error) {
//       //         console.log("Error getting document:", error);
//       // });
//       return;
 
//   }

//   const handleChange=(event)=>{

//       switch( event.target.name){

//           case 'firstName': setName( event.target.value);
//                         break;
//           case 'lastName': setLastName( event.target.value);
//                         break;
//           case 'email': setEmail( event.target.value);
//                         break;
//           case 'password': setPassword( event.target.value);
//                         break;
//       }
    
//   }

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper}>
//         <Avatar className={classes.avatar}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign up
//         </Typography>
//         <form className={classes.form} noValidate>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 autoComplete="fname"
//                 name="firstName"
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="firstName"
//                 label="First Name"
//                 value= {name}
//                 onChange={handleChange}
//                 autoFocus
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="lastName"
//                 label="Last Name"
//                 name="lastName"
//                 value= {lastName}
//                 onChange={handleChange}
//                 autoComplete="lname"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 value= {email}
//                 onChange={handleChange}
//                 autoComplete="email"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 variant="outlined"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 value= {password}
//                 onChange={handleChange}
//                 autoComplete="current-password"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControlLabel
//                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                 label="I want to receive inspiration, marketing promotions and updates via email."
//               />
//             </Grid>
//           </Grid>
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//             onClick={handleRegister}
//           >
//             Sign Up
//           </Button>
//           <Grid container justify="flex-end">
//             <Grid item>
//               <Link href="/SignIn" variant="body2">
//                 Already have an account? Sign in
//               </Link>
//             </Grid>
//           </Grid>
//         </form>
//       </div>
//       <Box mt={5}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }