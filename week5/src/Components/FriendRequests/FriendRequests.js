import React,{Component} from 'react';
import FriendRequest from './FriendRequest/FriendRequest';
import './FriendRequests.css';
import Button from '../UI/Button/Button';
class FriendRequests extends Component{


    render(){
        return(<div className="FriendRequests">
            <FriendRequest ></FriendRequest>
            <FriendRequest ></FriendRequest>
            <FriendRequest ></FriendRequest>
            <FriendRequest ></FriendRequest>
            <FriendRequest ></FriendRequest>
            <FriendRequest ></FriendRequest>

            <Button clicked={()=>this.props.toggleFriendRequests()}>Back</Button>
        </div>)
    }
}

export default FriendRequests;