import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import List from '@material-ui/core/List';
import MapIcon from '@material-ui/icons/Map';
import PlanIcon from '@material-ui/icons/Schedule';
import AreasIcon from '@material-ui/icons/Apartment';
import MaintainerIcon from '@material-ui/icons/DirectionsWalk';
import SignOutIcon from '@material-ui/icons/ExitToApp';

import TaskIcon from '@material-ui/icons/Build';

import Divider from '@material-ui/core/Divider';



export default function ListItems({handleClick}){

  const handleClickDash= (item)=>{
    console.log("you clciked me!!!", item)
    handleContent(item);
  
  }


const mainListItems = (


  <div>
    <ListItem button onClick={() => handleClick("dashboard")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={() => handleClick("tasks")}>
      <ListItemIcon>
        <TaskIcon />
      </ListItemIcon>
      <ListItemText primary="Tasks" />
    </ListItem>
    <ListItem button onClick={() => handleClick("users")}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
   
    <ListItem button onClick={() => handleClick("areas")}>
      <ListItemIcon>
        <AreasIcon />
      </ListItemIcon>
      <ListItemText primary="Areas" />
    </ListItem>

    <ListItem button onClick={() => handleClick("maintainers")}>
      <ListItemIcon>
        <MaintainerIcon />
      </ListItemIcon>
      <ListItemText primary="Maintainers" />
    </ListItem>

    <ListItem button onClick={() => handleClick("equipment")}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Equipment" />
    </ListItem>

    <ListItem button onClick={() => handleClick("plan")}>
      <ListItemIcon>
        <PlanIcon />
      </ListItemIcon>
      <ListItemText primary="Plan" />
    </ListItem>
    <ListItem button onClick={() => handleClick("heatmap")}>
      <ListItemIcon>
        <MapIcon />
      </ListItemIcon>
      <ListItemText primary="Heatmap" />
    </ListItem>


    <ListItem button onClick={() => handleClick("reports")}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>

    <ListItem button onClick={() => handleClick("singout")}>
      <ListItemIcon>
        <SignOutIcon/>
      </ListItemIcon>
      <ListItemText primary="Sign out" />
    </ListItem>
  </div>
);

 const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);


 

  return(
    <div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
    </div>
  )

}
