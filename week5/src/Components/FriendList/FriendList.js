import React from 'react';
import Friend from '../UI/Friend/Friend';
import './FriendList.css';
const FriendList=(props)=>{
    return(
        
        <div className="FriendList">
            <h4>Friends</h4>
            <Friend />
            <Friend />
            <Friend />
        </div>
    );
}

export default FriendList;