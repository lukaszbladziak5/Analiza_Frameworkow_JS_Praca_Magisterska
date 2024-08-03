import React, { Component } from 'react';
import '../App.css';
import logo from '../logo.png'

class Menu extends Component{
  render(){
    const { create, add,  remove } = this.props;
    return(
      <div className="menu-container" >

        <img src={logo} alt={'logo'} />
        <div className="framework" >
          <h1> React Test </h1>
        </div>

        <div className="buttons-container">
          <button id="create1000" className="Btn" onClick={() => create(1000) } >Create 1000 rows</button>
          <button id="add1000" className="Btn" onClick={() => {add(1000)}} >Add 1000 rows</button>
          <button id="create1000" className="Btn" onClick={() => {create(10000)}} >Create 10 000 rows</button>
          <button id="add10000" className="Btn" onClick={() => {add(10000)}} >Add 10 000 rows</button>
          <button id="delete" className="Btn" onClick={remove} >Clear</button>
        </div>
      </div>
    );
  }
}
export default Menu;
