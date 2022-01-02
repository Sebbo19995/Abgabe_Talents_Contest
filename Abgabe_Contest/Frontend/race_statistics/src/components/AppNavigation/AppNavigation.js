import React from 'react'
import {
    Link as DOMLink
  } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link  from '@mui/material/Link';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const AppNavigation = () => {

    return (
      
      <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={DOMLink} underline="hover" color="inherit" to="/">
          Welcome
        </Link>
        <Link
          component={DOMLink}
          underline="hover"
          color="inherit"
          to="/Past"
        >
          Past
        </Link>
        <Link
          component={DOMLink}
          underline="hover"
          color="inherit"
          to="/Future"
          /*aria-current="page"*/
        >
          Future
        </Link>
        <Link
          component={DOMLink}
          underline="hover"
          color="inherit"
          to="/HallOfFame"
          /*aria-current="page"*/
        >
          Hall of Fame
        </Link>
      </Breadcrumbs>
    </div>
        
    )
}

export default AppNavigation
