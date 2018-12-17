import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
    {label:'Salad' , type:'salad'},
    {label:'Bacon' , type:'bacon'},
    {label:'Cheese' , type:'cheese'},
    {label:'Meat' , type:'meat'}
];
const buildControls = (props) =>(
    <div className={classes.BuildControls} >
        <p>Current Price : <strong> {props.price} </strong> $</p>
        {controls.map( (cntr) => (
             <BuildControl  key={cntr.label} 
                            label={cntr.label}
                            added={() => props.ingredientAdded(cntr.type)} 
                            removed = {() => props.ingredientRemoved(cntr.type)}
                            disableInfo = {props.disabledInfo[cntr.type]}
                            />
        ))}
        <button
        onClick = {props.ordered} 
        className={classes.OrderButton}
        disabled = {!props.purchable} >ORDER NOW</button>
    </div>
)


export default buildControls;