import React,{Component} from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
    state = {
        showSideDrawe:false
    }
    closeSideDrawer = ()=>{
        this.setState({showSideDrawe:false});
    }
    openSideDrawer = () =>{
       
        this.setState((prev) =>{
            return {showSideDrawe:!prev.showSideDrawe};
        } );
    }
    render(){
        return (
            <Aux>

            <Toolbar openSideDrawer ={this.openSideDrawer} />
            <SideDrawer show={this.state.showSideDrawe} closed={this.closeSideDrawer} />
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}
export default Layout;