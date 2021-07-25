import { React, useState, useEffect } from 'react';
import './Header.css';
import cartImg from "../assets/cartImg.png";
import logo from "../assets/shop_logo.png";

const Header = (props) => {

  
  return (<>
  <div className="Header">
    <div className="logoDiv">
      <img src={logo} width="45px" height="45px" alt="logo"/>
      <p >Phones Shop</p>
    </div>
        
        {props.user && <p> hola {props.user.first_name+" "+props.user.last_name}</p>}
        <div className="cart"><img src={cartImg}width="40px" height="40px" alt="cart"/><div className="cartItemsNumber"><p>{props.cartItems}</p></div></div>
      </div>
  </>);
}

export default Header;