import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'


const orderSummart = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((igkey) => {
        return (
        <li key={igkey}  >
            <span style={{ textTransform: 'capitalize' }} > {igkey} </span>:{props.ingredients[igkey]}
        </li>
        )
    })
    return (
        <Aux>
            <h3> Your Order  </h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>continue to check out?</p>
            <p> <strong> Salary : {props.salary} $ </strong> </p>
            <Button clicked={props.hide} buttonType={"Danger"} >CANSEL</Button>
            <Button clicked={props.continue} buttonType={"Success"} >CONTINUE</Button>
        </Aux>
    )
}

export default orderSummart