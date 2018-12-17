import React ,{Component} from 'react'
import Aux from '../../hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGEREDINET_PRICES = {
    salad :0.5,
    cheese : 0.9,
    meat : 1.6,
    bacon : 0.3

}
class BurgerBuilder extends Component{
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice : 4, 
        purchable : false,
        showModal:false
    }
    updatepurchable = (ingredients)=> {
        const sum  = Object.keys(ingredients).map((key)=>{
           return ingredients[key] 
        }).reduce((sum , el)=>{
            return sum + el
        },0);
        this.setState({purchable : sum > 0})
    }
    addIngredientHandler =(type)=>{
        const olderCount = this.state.ingredients[type];
        const updatedcount = olderCount + 1;
        const upldateIngradent ={
            ...this.state.ingredients
        }
        upldateIngradent[type] = updatedcount;
        const pricaeAdded = INGEREDINET_PRICES[type];
        const oldeprice  = Math.round( this.state.totalPrice *100 ) /100;
        const newPrice = Math.round( (oldeprice + pricaeAdded) * 100 ) /100 ;
        this.setState({totalPrice:newPrice, ingredients:upldateIngradent});
        this.updatepurchable(upldateIngradent);
    }
    removeIngredientHandler =(type)=>{
        const olderCount = this.state.ingredients[type];
        
        if(olderCount <= 0 ){
            return;
        }
        const updatedcount = olderCount - 1;
        const upldateIngradent ={
            ...this.state.ingredients
        }
        upldateIngradent[type] = updatedcount;
        const pricaeDeduction = INGEREDINET_PRICES[type];
        const oldeprice  =Math.round(this.state.totalPrice * 100) / 100 ;
        const newPrice = Math.round( (oldeprice - pricaeDeduction) *100 ) / 100 ;
        this.setState({totalPrice:newPrice, ingredients:upldateIngradent});
        this.updatepurchable(upldateIngradent);
    }
    showModalHandler = () => {
        this.setState({showModal:true})
    }
    hideModalHandler =() =>{
        this.setState({showModal:false})
    }
    continueHandler =() =>{
        alert("Continue Clicked!");
    }
    render(){
        const disabpled = {
            ...this.state.ingredients
        }
        for(let key in disabpled){
            disabpled[key] = (disabpled[key] <= 0);
        }
        return (
            <Aux> 
                <Modal show={this.state.showModal} 
                       hide={this.hideModalHandler}
                          >
                    <OrderSummary   salary = {this.state.totalPrice}
                                    hide={this.hideModalHandler}
                                    continue={this.continueHandler} 
                                    ingredients ={this.state.ingredients} ></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ordered = {this.showModalHandler}
                    price = {this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    purchable = {this.state.purchable}
                    disabledInfo = {disabpled}

                    />
            </Aux>
        )
    }
}

export default BurgerBuilder