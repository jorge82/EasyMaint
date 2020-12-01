
import React,  { useState, useEffect } from 'react';
import Head from 'next/head';
import Table from '../Tables/Table';

import TaskForm from '../Forms/TaskForm';
import { fetchTasks, deleteTask } from '../../DB/tasks';
import Grid from '@material-ui/core/Grid';
import ConfirmDialog from '../Alerts/ConfirmDialog';


export default function Tasks() {
  const [data, setData]=React.useState([]);
  const [editTask, setEditTask]=React.useState(false);
  const [deleteAction, setDeleteAction]=React.useState(false);
  const [selectedID, setSelectedID]=React.useState('');


  useEffect(()=>{
     fetchData();
  },[])

  async function fetchData() {
    let tasks = [];
    await fetchTasks().then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
            tasks.push({
                id: doc.id,
                name: doc.data().name,
                description:  doc.data().description,
                userOwner:doc.data().owner ,
                userResponsable: doc.data().responsible,
                gpsCoordinates:doc.data().gpsCoordinates ,
                area:doc.data().area ,
                status: doc.data().status,
                priority: doc.data().priority,
                percentageCompleted: doc.data().percentageCompleted,
                dateCreated: doc.data().dateCreated,
                datePlannedStart:doc.data().datePlannedStart,
                dateExpiration:doc.data().dateExpiration,
                dateCompleted:doc.data().dateCompleted

            })  
    })
      console.log("fetching tasks:", tasks);
      setData(tasks); 
    })
    
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
        
   }

   function handleEdit(id){
    if(selectedID==id){
      setEditTask(false);
    }else{
      setEditTask(true);
      setSelectedID(id);
    }
      fetchData();
  }

  function handleDelete(id){
      setSelectedID(id);
      setDeleteAction(true);
      setEditTask(false);    
  }

  function deleteTaskByID(){
      deleteTask(selectedID);
      fetchData();
  }
  
    //setting the header of the table
    const headCells = [
      { id: 'id', numeric: false, disablePadding: true, label: 'Task ID' },
      { id: 'name', numeric: false, disablePadding: true, label: 'Task Name' },
      { id: 'priority', numeric: false, disablePadding: true, label: 'Priority' },
      { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
      { id: 'userOwner', numeric: false, disablePadding: true, label: 'Owner' },
      { id: 'userResponsable', numeric: false, disablePadding: true, label: 'Responsible' },
      { id: 'area', numeric: false, disablePadding: true, label: 'Area' },
      { id: 'percentageCompleted', numeric: false, disablePadding: true, label: '% Completed' },
      { id: 'dateCreated', numeric: false, disablePadding: true, label: 'Date Created' },
      { id: 'dateCompleted', numeric: false, disablePadding: true, label: 'Date Completed' },
 
    ];

    return (
      <div>
        <Head>
          <title>EasyTask</title> 
        </Head>
        <Grid
                  container
                  spacing={0}
            >
            <Grid item xs={12}>
                        <ConfirmDialog
                              title={`Are you sure you want to erase ${selectedID}?`}
                              open={deleteAction}
                              setOpen={setDeleteAction}
                              onConfirm={deleteTaskByID}> 
                        </ConfirmDialog>
                        <TaskForm edition={editTask} ID={selectedID} handleUpdate={fetchData}/>
            </Grid>
            <Grid item xs={12}  >
            
                <Table headCells={headCells} values={data} orderBy='id' title='Tasks'
                      addEditButton={true}  handleEdit={handleEdit}
                      addDeleteButton={true}  handleDelete={handleDelete}></Table>

            </Grid>
        </Grid>
  
      </div>
    );
}
