
import React,  { useState, useEffect } from 'react';
import Head from 'next/head';
import Table from '../Tables/Table';

import UserForm from '../Forms/UserForm';
import { fetchUsers, deleteUser } from '../../DB/users_b';
import Grid from '@material-ui/core/Grid';
import ConfirmDialog from '../Alerts/ConfirmDialog';


export default function Users() {
  const [data, setData]=React.useState([]);
  const [editUser, setEditUser]=React.useState(false);
  const [deleteAction, setDeleteAction]=React.useState(false);
  const [selectedID, setSelectedID]=React.useState('');


  useEffect(()=>{
     fetchData();
  },[])

  async function fetchData() {
    let users = [];
    await fetchUsers().then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
            users.push({
                name: doc.data().name,
                lastName:  doc.data().lastName,
                email: doc.data().email,
                password: doc.data().password,
                position: doc.data().position

            })  
    })
      console.log("users:", users);
      setData(users); 
    })
    
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
        
   }

   function handleEdit(id){
    if(selectedID==id){
      setEditUser(false);
    }else{
      setEditUser(true);
      setSelectedID(id);
    }
      fetchData();
  }

  function handleDelete(id){
      setSelectedID(id);
      setDeleteAction(true);
      setEditUser(false);    
  }

  function deleteUserByID(){
      deleteUser(selectedID);
      fetchData();
  }
  
    //setting the header of the table
    const headCells = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'lastName', numeric: false, disablePadding: true, label: 'last Name' },
      { id: 'email', numeric: false, disablePadding: true, label: 'Email' },
      { id: 'password', numeric: false, disablePadding: true, label: 'Password' },
      { id: 'position',numeric: false, disablePadding: true, label: 'Position' },
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
                              onConfirm={deleteUserByID}> 
                        </ConfirmDialog>
                        <UserForm edition={editUser} email={selectedID} handleUpdate={fetchData}/>
            </Grid>
            <Grid item xs={12}  >
            
                <Table headCells={headCells} values={data} orderBy='lastName' title='Users'
                      addEditButton={true}  handleEdit={handleEdit}
                      addDeleteButton={true}  handleDelete={handleDelete}></Table>

            </Grid>
        </Grid>
  
      </div>
    );
}
