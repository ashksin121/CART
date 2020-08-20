import React, {Component} from 'react';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';
import FrontScreen from './component/frontScreen/frontScreen';
import Login from './container/login/login';
import Dashboard from './container/dashboard/dashboard';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFront: true
    }
  }

  componentDidMount() {
    this.id  = setTimeout(() => this.setState({showFront: false}), 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    return (
      <div className="App">
        <FrontScreen showFront={this.state.showFront} />
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Redirect to={'/login'} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
