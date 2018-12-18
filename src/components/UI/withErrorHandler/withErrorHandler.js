import React , {Component} from 'react'

import Modal from '../Modal/Modal'

import Aux from '../../../hoc/Aux'

const withErrorHandler = (WrappedCommponent , axios) => {
    return class extends Component{
        state = {
            error:null
        }
        componentWillMount(){
            axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
            })
            axios.interceptors.response.use(null, error =>{
                this.setState({error});
            })
        }
        errorConfirmedHandler = ()=>{   
            this.setState({error:null});
        }
        render(){
            return (
                <Aux>
                    <Modal 
                            show = {this.state.error}
                            hide = {this.errorConfirmedHandler}
                        >
                        {this.state.error ? this.state.error.message :null}
                    </Modal>
                    <WrappedCommponent {...this.props} />
                </Aux>
            )
        }
    } 
}



export default withErrorHandler;