import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Rendering from './components/Rendering';
import Row from './components/Row';
import buildData from './dummyData';
import Animation from './components/Animation';
import Map from './components/Map';
import Server from './components/Server';

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

  remove = () => {
    this.setState({ data: [] });
  }

  render() {
    const { navigate } = this.props;

    return (
      <div className = "navigation">
        <nav>
          <button onClick={() => navigate('/rendering')}>Rendering</button>
          <button onClick={() => navigate('/server')}>Server</button>
          <button onClick={() => navigate('/animation')}>Animation</button>
          <button onClick={() => navigate('/map')}>Map</button>
        </nav>
        <Routes>
          <Route path="/rendering" element={
            <>
              <Rendering
                create={this.create}
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
          <Route path="/server" element={
            <>
              <Server 
                create={this.create}
                remove={this.remove}
                onCreateOneThousandRows={this.onCreateOneThousandRows}
                onCreateTenThousandsRows={this.onCreateTenThousandsRows}
                onGetOneThousandRows={this.onGetOneThousandRows}
                onGetTenThousandsRows={this.onGetTenThousandsRows}
                onUpdateOneThousandRows={this.onUpdateOneThousandRows}
                onUpdateTenThousandsRows={this.onUpdateTenThousandsRows}
                onRemove={this.onRemove}
                clearDatabase={this.clearDatabase}
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
          <Route path="/map" element={<Map />} />
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