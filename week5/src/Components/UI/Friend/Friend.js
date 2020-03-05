import React from 'react';
import dp from '../../../dp.jpg';
import  './Friend.css';
const Friend=(props)=>{
    return(
        <div className="Friend">
            <img src={dp} />
            <h4>Jesulonimi</h4>
        </div>
    );
}

export default Friend;