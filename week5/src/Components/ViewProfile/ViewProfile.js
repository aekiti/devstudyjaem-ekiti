import React,{Component} from 'react';
import './ViewProfile.css'
import picture from '../../dp.jpg';
import {connect} from 'react-redux';
import { stat } from 'fs';

class ViewProfile extends Component{

    state={
        dpHash:null,
        name:"",
        discipline:"",
        status:""
    }

    componentDidMount(){

    }

    render(){
        return (<div className="ViewProfile">

                    <img src={picture} className="VPImage"/>
                    <h4>Jesulonimi</h4>
                    <h4>Software Development</h4>
                    <p>God is watching us</p>

                </div>)
    }
}

const mapStateToProps=(state)=>{
    return{
        client:state.client
    }
}
export default connect(mapStateToProps)(ViewProfile);