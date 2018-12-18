import React ,{Component} from 'react'
import Aux from '../../hoc/Aux'
import axios  from '../../axios-orders'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../components/UI/withErrorHandler/withErrorHandler' 

const INGEREDINET_PRICES = {
    salad :0.5,
    cheese : 0.9,
    meat : 1.6,
    bacon : 0.3

}
class BurgerBuilder extends Component{
    state = {
        ingredients:null,
        totalPrice : 4, 
        purchable : false,
        showModal:false,
        loading:false
    }
    componentDidMount (){
        axios.get('https://burger-builder-283c3.firebaseio.com/ingredients.json')
            .then(response =>{
                console.log(response);
                this.setState({ingredients :response.data})
            }).catch(error => console.log(error.message))
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
        this.setState({loading:true})
        //alert("Continue Clicked!");
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer:{
                name:'salah',
                address :{
                    street : 'domyatta',
                    zipcode :'02075',
                    contry :'egypt'
                },
                email :'salah@gmail.com'
            },
            deliveryMethod :'fastest'
        }
        console.log(order);
        axios.post('/Orders.json',order)
                    .then((respone) =>{
                        console.log(respone)
                        this.setState({loading:false,  showModal:false})
                    })
                    .catch(errer => {
                        this.setState({loading:false, showModal:false});
                        console.log(errer)
                    });
    }
    render(){
        const disabpled = {
            ...this.state.ingredients
        }
        for(let key in disabpled){
            disabpled[key] = (disabpled[key] <= 0);
        }
        let orderSummary = null;
       
       
        
        let  burger = <Spinner />
        if(this.state.ingredients){
            burger = (
                <Aux>
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
            );
            orderSummary =  <OrderSummary   salary = {this.state.totalPrice}
            hide={this.hideModalHandler}
            continue={this.continueHandler} 
            ingredients ={this.state.ingredients} />
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return (
            <Aux> 
                <Modal show={this.state.showModal} 
                       hide={this.hideModalHandler}
                          >
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, axios);