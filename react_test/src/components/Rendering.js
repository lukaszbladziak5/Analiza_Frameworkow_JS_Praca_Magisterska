import React, { Component } from 'react';
import '../App.css';
import logo from '../logo.png'

class Rendering extends Component{
  render(){
    const { create, remove } = this.props;
    return(
      <div className="menu-container" >

        <img src={logo} alt={'logo'} />
        <div className="framework" >
          <h1> React Rendering Test </h1>
        </div>

        <div className="buttons-container">
          <button id="create1000" className="Btn" onClick={() => create(1000) } >Create 1 000 rows</button>
          <button id="create10000" className="Btn" onClick={() => {create(10000)}} >Create 10 000 rows</button>
          <button id="delete" className="Btn" onClick={remove} >Clear</button>
        </div>
      </div>
    );
  }
}
export default Rendering;
