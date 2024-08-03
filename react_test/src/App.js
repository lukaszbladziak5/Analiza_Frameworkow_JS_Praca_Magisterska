import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Rendering from './components/Rendering';
import Row from './components/Row';
import buildData from './dummyData';
import Animation from './components/Animation';

// Higher-order component to provide navigation
function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class App extends Component {
  state = {
    data: [],
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
    const { navigate } = this.props;

    return (
      <div>
        <nav>
          <button onClick={() => navigate('/')}>Rendering</button>
          <button onClick={() => navigate('/animation')}>Animation</button>
        </nav>
        <Routes>
          <Route path="/" element={
            <>
              <Rendering
                create={this.create}
                add={this.add}
                remove={this.remove}
              />
              <table className="data-table">
                <tbody>
                  {this.state.data.map((item, i) => (
                    <Row key={i} item={item}></Row>
                  ))}
                </tbody>
              </table>
            </>
          } />
          <Route path="/animation" element={<Animation />} />
        </Routes>
      </div>
    );
  }
}

const AppWithNavigation = withNavigation(App);

function AppWrapper() {
  return (
    <Router>
      <AppWithNavigation />
    </Router>
  );
}

export default AppWrapper;