import React, { Component } from 'react';

class Row extends Component {

  render() {
    let { item } = this.props;
    return (
      <tr className="data-row ">
        <td className="small-col" >{item.id}</td>
        <td className="big-col" >{item.label}</td>
      </tr>);
  }
}
export default Row;
