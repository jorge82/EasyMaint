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

import { saveArea, fetchAreaByID,  deleteArea } from '../../DB/areas';


import Alert from '@material-ui/lab/Alert';
import AlertDialog from '../Alerts/AlertDialog'
import {storage} from '../../DB/firebase';



const PICTURESFOLDER='areaPictures';

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

export default function AreaForm(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
   
  
    const [imageSrc, setImageSrc] = useState(null);  
    const [imageUrl, setImageUrl] = useState(null);  
    const [added, setAdded] = useState(false);  
    const [edited, setEdited] = useState(false);  
    const [edition, setEdition] = useState(false);  
    const [file, setFile]=useState(null); 
    const [oldID, setOldID] = useState(''); 


    const [alertExist, setAlertExist] = useState(false); 
  
    const [errorName, setErrorName]=React.useState(false);
    const [errordescription, setErrorDescription]=React.useState(false);
    const classes = useStyles();


      useEffect(() => {
          setEdition(props.edition);
          if(!props.edition){
              handleCancel();
              return;
          }
          if(props.name){
            loadData(props.name);
            setOldID(props.name);
            
          }
          
        }, [props])


      const handleChange = function loadFile(event) {
         
        if (event.target.files.length > 0) {
            const fileURL = URL.createObjectURL(event.target.files[0]);

            setFile(event.target.files[0])
            setImageSrc(fileURL);
        }
      
    };

    const saveAreaWithImage = (id,file) => {
 
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
                    name: name,
                    description: description,
                    imageUrl: fireBaseUrl
                    };
                    saveArea(id, data);

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
                  name: name,
                  description: description,
                };
 
                saveArea(id, data);
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

          case 'name': setName( event.target.value);
                            setErrorName(false);
                            break;
          case 'description':  setDescription( event.target.value);
                            setErrorDescription(false);
                            break;
         
      }
      setAdded(false);
      setEdited(false);

    };

    function loadData(name){
        fetchAreaByID(name).then(function(doc) {
          if(doc.data()){
            //console.log("datos recibidos", doc.data())
            setName(doc.data().name);
            setDescription(doc.data().description);
            setImageUrl(doc.data().imageUrl);
            setImageSrc(doc.data().imageUrl);
          }

        });
        setEdition(true);
    }

    async function handleSave(){
      var error=false;
       
        if(!name){
          setErrorName(true);
          error=true;
        }
        if(!description){
          setErrorDescription(true);  
          error=true;
        }
       
        if (error){
          return;
        }
       
        let data={}
        if(!edition){
          fetchAreaByID(name).then(function(doc) {
            if (doc.exists) {
                setAlertExist(true); 
                return; 
            } else {
              saveAreaWithImage(name, file);
            }
          }).catch(function(error) {
                console.log("Error getting document:", error);
          });
      }else{
         
          saveAreaWithImage(name, file);
      }

       function update(){ props.handleUpdate();}
       update();
    }

    function handleCancel(){
        setName('');
        setDescription('');
        setEdition(false);
        setImageSrc(null);
        setImageUrl(null);
        return;
    }

 

    return (
        <Container >
        <AlertDialog title={'Area already exists!'} open={alertExist}></AlertDialog> 
      
        {  added && (<Alert severity="success">Area added successfully!</Alert>)}
        {  edited && (<Alert severity="info">Area updated successfully!</Alert>)}
      
          <CssBaseline />
          <div className={classes.paper}>
          
          {edition &&(<Typography component="h1" variant="h5">Edit Area </Typography>)}
          {!edition &&(<Typography component="h1" variant="h5">New Area</Typography>)}

            <input type="file" onChange={handleChange} id="upload" accept="image/*" style={{display: "none"}}/>
                <label htmlFor="upload">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <Avatar variant="square"  id="avatar" src={imageSrc}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderWidth:5,
                                    borderColor:"primary",
                                    borderStyle:'solid'
                                }}
                        >Area</Avatar>
                    </IconButton>
                </label>
                <label htmlFor="avatar"/>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>

                  <TextField
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            autoFocus
                            value= {name}
                            onChange={handleChangeText}
                            error={errorName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>

                  <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="lname"
                            value= {description}
                            onChange={handleChangeText}
                            error={errordescription}
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
                  {edition &&('Edit')}{!edition &&('Add')}
                </Button>

                <Button
                          fullWidth
                          variant="contained"
                          color="secondary"
                          className={classes.submit}
                          onClick={handleCancel}
                >Cancel
                </Button>
            
            </form>
          </div>
        
        </Container>
      );
}