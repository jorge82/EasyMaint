import React,{useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { saveTask, updateTask, fetchTaskByID,  deleteTask } from '../../DB/tasks';


import Alert from '@material-ui/lab/Alert';
import AlertDialog from '../Alerts/AlertDialog'
import {storage} from '../../DB/firebase';



const PICTURESFOLDER='taskPictures';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function TaskForm(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [userOwner, setUserOwner] = useState('');
    const [userResponsible, setUserResponsible] = useState('');
    const [gpsCoordinates, setGpsCoordinates] = useState([]);
    const [area, setArea] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [percentageCompleted, setPercentageCompleted] = useState('');
    const [dateCreated, setDateCreated] = useState('');



   
  
    const [imageSrc, setImageSrc] = useState(null);  
    const [imageUrl, setImageUrl] = useState(null);  
    const [added, setAdded] = useState(false);  
    const [edited, setEdited] = useState(false);  
    const [edition, setEdition] = useState(false);  
    const [file, setFile]=useState(null); 
    const [oldID, setOldID] = useState(''); 


    const [alertExist, setAlertExist] = useState(false); 
  
    const [errorName, setErrorName]=React.useState(false);
    const [errorDescription, setErrorDescription]=React.useState(false);
    const [errorArea, setErrorArea]=React.useState(false);
    const [errorPriority, setErrorPriority]=React.useState(false);
    const classes = useStyles();


      useEffect(() => {
          setEdition(props.edition);
          if(!props.edition){
              handleCancel();
              return;
          }
          if(props.ID){
            loadData(props.ID);
            setOldID(props.ID);
            
          }
          
        }, [props])


      const handleChange = function loadFile(event) {
         
        if (event.target.files.length > 0) {
            const fileURL = URL.createObjectURL(event.target.files[0]);

            setFile(event.target.files[0])
            setImageSrc(fileURL);
        }
      
    };

    const saveTaskWithImage = (id,file) => {
 
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
                    owner: userOwner,
                    responsible:userResponsible,
                    area:area,
                    priority:priority,   
                    imageUrl: fireBaseUrl
                    };
                    if(edition){
                        updateTask(oldID, data);
                        setAdded(false)
                        setEdited(true);
                        return;
                    }
                    saveTask( data);
                    setAdded(true);
                  
    
                })
           })
      }else{
                const data = {
                  name: name,
                  description: description,
                  owner: userOwner,
                  responsible:userResponsible,
                  area:area,
                  priority:priority,   
                };
 
                if(edition){
                    updateTask(oldID, data);
                    setAdded(false)
                    setEdited(true);
                    return;
                }
                saveTask( data);
                setAdded(true);
      }
   
    }

    const handleChangeText = function loadChanges(event) {
      setAlertExist(false);
      
      switch( event.target.name){

          case 'name':          setName( event.target.value);
                                setErrorName(false);
                                break;
          case 'description':   setDescription( event.target.value);
                                setErrorDescription(false);
                                break;
        case 'userOwner':       setUserOwner( event.target.value);
                                break;
        case 'userResponsible': setUserResponsible( event.target.value);
                           
                                break;  
        case 'area':            setArea( event.target.value);
                                setErrorArea(false);
                                break;  
        default :               setPriority( event.target.value);
                                setErrorPriority(false);
                                break; 
        
       
      }
      setAdded(false);
      setEdited(false);

    };

    function loadData(name){
        fetchTaskByID(name).then(function(doc) {
          if(doc.data()){
            //console.log("datos recibidos", doc.data())
            setName(doc.data().name);
            setDescription(doc.data().description);
            setUserOwner(doc.data().owner);
            setUserResponsible(doc.data().responsible);
            setArea(doc.data().area);
            setPriority(doc.data().priority);
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
        if(!area){
            setErrorArea(true);  
            error=true;
          }
        if(!priority){
        setErrorPriority(true);  
        error=true;
        }
        if (error){
          return;
        }
       
        
         
          saveTaskWithImage(name, file);
      

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
        <AlertDialog title={'Task already exists!'} open={alertExist}></AlertDialog> 
      
        {  added && (<Alert severity="success">Task added successfully!</Alert>)}
        {  edited && (<Alert severity="info">Task updated successfully!</Alert>)}
      
          <CssBaseline />
          <div className={classes.paper}>
          
          {edition &&(<Typography component="h1" variant="h5">Edit Task </Typography>)}
          {!edition &&(<Typography component="h1" variant="h5">New Task</Typography>)}

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
                        >Task</Avatar>
                    </IconButton>
                </label>
                <label htmlFor="avatar"/>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} >
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
                <Grid item xs={12} >

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
                            error={errorDescription}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>

                <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id=""
                        label="Owner"
                        name="userOwner"
                        autoComplete="lname"
                        value= {userOwner}
                        onChange={handleChangeText}
        
                />
                </Grid>
                <Grid item xs={12} sm={6}>

                    <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="userResponsible"
                            label="Responsible"
                            name="userResponsible"
                            autoComplete="lname"
                            value= {userResponsible}
                            onChange={handleChangeText}

                    />
                    </Grid>  
                
                <Grid item xs={12} sm={6}>

                    <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="area"
                            label="Area"
                            name="area"
                            autoComplete="lname"
                            value= {area}
                            onChange={handleChangeText}
                            error={errorArea}

                    />
                </Grid>   
             
                <Grid item xs={12} sm={6}>



                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value= {priority}
                            onChange={handleChangeText}
                            error={errorPriority}
                        >
                            <MenuItem value={'low'}>Low</MenuItem>
                            <MenuItem value={'medium'}>Medium</MenuItem>
                            <MenuItem value={'high'}>High</MenuItem>
                            <MenuItem value={'emergency'}>Emergency</MenuItem>
                        </Select>
                    </FormControl>   

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