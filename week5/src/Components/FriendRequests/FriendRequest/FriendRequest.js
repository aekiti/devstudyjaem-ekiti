import React from "react";
import './FriendRequest.css';
import Button from '../../UI/Button/Button';
import dp from '../../../dp.jpg';
const FriendRequest=(props)=>{
    return <div className="FriendRequest">
       <img src={dp} />
       <p className="FRKey">Public key</p>
        <Button otherClass="FRConfirm">Confirm</Button>
        <Button otherClass="FRReject">Reject</Button>
    </div>
}

export default FriendRequest;