import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import Row from './components/Row';
import buildData from './dummyData';

class App extends Component {

  state = {
    data:[],
  }

  create = (amount) => {
    this.setState({ data: buildData(amount) });
  }

  add = (amount) => {
    this.setState({ data: this.state.data.concat(buildData(amount)) });
  }

  remove = () => {
    this.setState({ data: [] });
  }


  render() {
    return (
      <div className="App">
        <Menu
          create={this.create}
          add={this.add}
          remove={this.remove}
        />

        <table className="data-table"><tbody>
          {this.state.data.map((item, i) => (
            <Row key={i} item={item} ></Row>
          ))}
        </tbody></table>

      </div>
    );
  }
}

export default App;
