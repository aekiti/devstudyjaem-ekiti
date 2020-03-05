import React from 'react';
import './Header.css';
import dp from '../../../dp.jpg';
const Header=(props)=>{
    let usersDp=dp;
    if(props.imageUrl!=""){
        usersDp=props.imageUrl;
    }
    
    return(
        <header >
            <img src={usersDp} className="header-img" onClick={props.profToggle}/>
            <h4 className="appname" onClick={props.navToggle}>Aekiti Chat</h4>

            <div className="nav-drawer" onClick={props.navToggle}>
                <div className="item-i"/>
                <div className="item-i"/>
                <div className="item-i"/>
            </div>
        </header>
    )
}

export default Header;