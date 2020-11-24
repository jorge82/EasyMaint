import React,{useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { saveUser, fetchUserByEmail,  deleteUser } from '../../DB/users_b';


import Alert from '@material-ui/lab/Alert';
import AlertDialog from '../Alerts/AlertDialog'
import {storage} from '../../DB/firebase';

//Form to add and edit waiter profile
// In the future it must me refactored so it can be used to handle other user add and edition

const PICTURESFOLDER='profilePictures';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: theme.spacing(10),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState("");  
    const [password, setPassword] = useState('');  
    const [position, setPosition] = useState('');  
  
    const [imageSrc, setImageSrc] = useState(null);  
    const [imageUrl, setImageUrl] = useState(null);  
    const [added, setAdded] = useState(false);  
    const [edited, setEdited] = useState(false);  
    const [edition, setEdition] = useState(false);  
    const [file, setFile]=useState(null); 

    const [alertExist, setAlertExist] = useState(false); 
    const [oldEmail, setOldEmail] = useState(''); 

    const [errorEmail, setErrorEmail]=React.useState(false);
    const [errorPass, setErrorPass]=React.useState(false);
    const [errorName, setErrorName]=React.useState(false);
    const [errorlastName, setErrorLastName]=React.useState(false);
    const [errorPosition, setErrorPosition]=React.useState(false);
    const classes = useStyles();


      useEffect(() => {
          setEdition(props.edition);
          if(!props.edition){
              handleCancel();
              return;
          }
          if(props.email){
            loadData(props.email);
            setOldEmail(props.email);
            
          }
        }, [props])


      const handleChange = function loadFile(event) {
         
        if (event.target.files.length > 0) {
            const fileURL = URL.createObjectURL(event.target.files[0]);

            setFile(event.target.files[0])
            setImageSrc(fileURL);
        }
      
    };

    const saveUserWithImage = (id,file) => {
 
      if (file){
      const storageRef= storage.ref().child(PICTURESFOLDER).child(id);
      const task= storageRef.put(file);
        task.on('state_changed', 
                (snapShot) => {
                //takes a snap shot of the process as it is happening
                console.log(snapShot)
              }, (err) => {
                //catches the errors
                console.log(err)
              }, () => {
                // gets the functions from storage refences the image storage in firebase by the children
                // gets the download url then sets the image from firebase as the value for the imgUrl key:
                storage.ref(PICTURESFOLDER).child(id).getDownloadURL()
                .then(fireBaseUrl => {
                  setImageUrl(fireBaseUrl);
                  const data = {
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    position: position,
                    imageUrl: fireBaseUrl
                    };
                    saveUser(id, data);

                    if(!edition){
                      setAdded(true);
                    }else{
                       setAdded(false)
                       setEdited(true);
                    }
    
                })
           })
      }else{
                const data = {
                  firstName: firstName,
                  lastName: lastName,
                  password: password,
                  imageUrl: imageUrl
                };
 
                saveUser(id, data);
                setAdded(true);

                if(!edition){
                  setAdded(true);
                }else{
                  setAdded(false)
                  setEdited(true);
                }
      }
    }

    const handleChangeText = function loadChanges(event) {
      setAlertExist(false);
      
      switch( event.target.name){

          case 'firstName': setFirstName( event.target.value);
                            setErrorName(false);
                            break;
          case 'lastName':  setLastName( event.target.value);
                            setErrorLastName(false);
                            break;
          case 'email':     setEmail( event.target.value);
                            setErrorEmail(false);
                            break;
          case 'password':  setPassword( event.target.value);
                            setErrorPass(false);
                            break;
          case 'position':  setPosition( event.target.value);
                            setErrorPosition(false);
                            break;
      }
      setAdded(false);
      setEdited(false);

    };

    function loadData(email){
        fetchUserByEmail(email).then(function(doc) {
          if(doc.data()){
            //console.log("datos recibidos", doc.data())
            setFirstName(doc.data().firstName);
            setLastName(doc.data().lastName);
            setPassword(doc.data().password);
            setEmail(email);
            setPosition(doc.data().position);
            setImageUrl(doc.data().imageUrl);
            setImageSrc(doc.data().imageUrl);
          }

        });
        setEdition(true);
    }

    async function handleSave(){
        if(! emailIsValid(email)){
          setErrorEmail(true);
        }
        if(!firstName){
          setErrorName(true);
        }
        if(!lastName){
          setErrorLastName(true);  
        }
        if(!email){
          setErrorEmail(true);
        }
        if(!password){
          setErrorPass(true);
        }
        if(!position){
          setErrorPosition(true);
        }
        const id=email
        let data={}
        if(!edition){
          fetchUserByEmail(email).then(function(doc) {
            if (doc.exists) {
                setAlertExist(true);  
            } else {
              saveUserWithImage(id, file);
            }
          }).catch(function(error) {
                console.log("Error getting document:", error);
          });
      }else{
          if(oldEmail!=email){
              deleteUser(oldEmail); 
          }
          saveUserWithImage(id, file);
      }

       function update(){ props.handleUpdate();}
       update();
    }

    function handleCancel(){
        setFirstName('');
        setLastName('');
        setPassword('');
        setEmail('');
        setPosition('');
        setEdition(false);
        setImageSrc(null);
        setImageUrl(null);
        return;
    }

    function emailIsValid(email){
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        return false;
      }
      return true;
    }

    return (
        <Container >
        <AlertDialog title={'Usuario ya existe'} open={alertExist}></AlertDialog> 
      
        {  added && (<Alert severity="success">Mozo agregado con exito!</Alert>)}
        {  edited && (<Alert severity="info">Mozo editado con exito!</Alert>)}
      
          <CssBaseline />
          <div className={classes.paper}>
          
          {edition &&(<Typography component="h1" variant="h5">Edit User </Typography>)}
          {!edition &&(<Typography component="h1" variant="h5">New User</Typography>)}

            <input type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: "none"}}/>
                <label htmlFor="upload">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <Avatar id="avatar" src={imageSrc}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderWidth:5,
                                    borderColor:"primary",
                                    borderStyle:'solid'
                                }}
                        />
                    </IconButton>
                </label>
                <label htmlFor="avatar"/>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>

                  <TextField
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="Name"
                            autoFocus
                            value= {firstName}
                            onChange={handleChangeText}
                            error={errorName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>

                  <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            value= {lastName}
                            onChange={handleChangeText}
                            error={errorlastName}
                  />
                </Grid>
                <Grid item xs={12}>

                  <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value = {email}
                            onChange={handleChangeText}
                            error={errorEmail}
                  />
                </Grid>
                <Grid item xs={12}>

                  <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value= {password}
                            onChange={handleChangeText}
                            error={errorPass}
                  />
                </Grid>
                <Grid item xs={12}>

                  <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="position"
                            label="Position"
                            name="position"
                            autoComplete="position"
                            value = {position}
                            onChange={handleChangeText}
                            error={errorPosition}
                  />
                  </Grid>
              
              </Grid>
                  <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={handleSave}
                        >
                  {edition &&('Editar')}{!edition &&('Agregar')}
                </Button>

                <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          className={classes.submit}
                          onClick={handleCancel}
                >Cancelar
                </Button>
            
            </form>
          </div>
        
        </Container>
      );
}