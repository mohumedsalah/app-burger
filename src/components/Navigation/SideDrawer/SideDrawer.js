import React from 'react'
import Logo from '../../Logo/Logo'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigationItems'
import Aux from '../../../hoc/Aux'
const sideDrawer = (props) => {


    let attacedClasses = [classes.SideDrawer, classes.Close]
    if(props.show){
        attacedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Aux>
            <Backdrop show={props.show} hide = {props.closed} />
            <div className={attacedClasses.join(' ')}  >
                <div className={classes.Logo} >
                    <Logo />
                </div>
                <nav  >
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;