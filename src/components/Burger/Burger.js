import React from 'react'
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props) => {
    let ingredient = Object.keys(props.ingredients)
        .map((igkey) => {
            return [...Array(props.ingredients[igkey])]
                .map((_, i) => {
                    return <BurgerIngredient key={igkey + i} type={igkey} />
                })
        }).reduce((pre, el) =>{
            return pre.concat(el)
        }, []);
    
        if(ingredient.length === 0){
            ingredient = <p>Please start insert ingredients</p>
        }
    return (




        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );


}

export default burger;