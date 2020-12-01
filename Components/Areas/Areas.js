
import React,  { useState, useEffect } from 'react';
import Head from 'next/head';
import Table from '../Tables/Table';

import AreaForm from '../Forms/AreaForm';
import { fetchAreas, deleteArea } from '../../DB/areas';
import Grid from '@material-ui/core/Grid';
import ConfirmDialog from '../Alerts/ConfirmDialog';


export default function Areas() {
  const [data, setData]=React.useState([]);
  const [editArea, setEditArea]=React.useState(false);
  const [deleteAction, setDeleteAction]=React.useState(false);
  const [selectedID, setSelectedID]=React.useState('');


  useEffect(()=>{
     fetchData();
  },[])

  async function fetchData() {
    let areas = [];
    await fetchAreas().then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
            areas.push({
                name: doc.data().name,
                description:  doc.data().description,

            })  
    })
      console.log("fetching areas:", areas);
      setData(areas); 
    })
    
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
        
   }

   function handleEdit(id){
    if(selectedID==id){
      setEditArea(false);
    }else{
      setEditArea(true);
      setSelectedID(id);
    }
      fetchData();
  }

  function handleDelete(id){
      setSelectedID(id);
      setDeleteAction(true);
      setEditArea(false);    
  }

  function deleteAreaByID(){
      deleteArea(selectedID);
      fetchData();
  }
  
    //setting the header of the table
    const headCells = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Area Name' },
      { id: 'description', numeric: false, disablePadding: true, label: 'Description' },

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
                              onConfirm={deleteAreaByID}> 
                        </ConfirmDialog>
                        <AreaForm edition={editArea} name={selectedID} handleUpdate={fetchData}/>
            </Grid>
            <Grid item xs={12}  >
            
                <Table headCells={headCells} values={data} orderBy='name' title='Areas'
                      addEditButton={true}  handleEdit={handleEdit}
                      addDeleteButton={true}  handleDelete={handleDelete}></Table>

            </Grid>
        </Grid>
  
      </div>
    );
}
