import React from 'react';
import './NavigationItems.css';
const NavigationItems=(props)=>{
    return(
        <div className="NavigationItems">
            <p className="Item" onClick={props.frClicked}>Friend Requests</p>
            <p className="Item">About</p>
        </div>
    )
}

export default NavigationItems;