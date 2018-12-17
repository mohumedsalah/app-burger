import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'
const navigationItems = () =>(
    <ul className={classes.NavigationItems} >
        <NavigationItem  link="/" active={true}  >Burger Builder</NavigationItem>
        <NavigationItem  >Check out</NavigationItem>
    </ul>
)


export default navigationItems