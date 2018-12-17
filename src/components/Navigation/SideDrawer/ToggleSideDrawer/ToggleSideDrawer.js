import React from 'react'

import classes from './ToggleSiderDrawer.css'
const toggleSideDrawer = (props) =>(
    <div  className={classes.DrawerToggle} onClick={props.click} >
        <div ></div>
        <div></div>
        <div></div>
    </div>
)


export default toggleSideDrawer;