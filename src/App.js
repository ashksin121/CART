import React, {Component} from 'react';
import FrontScreen from './component/frontScreen/frontScreen';
import Login from './container/login/login';
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
        <Login />
      </div>
    );
  }
}

export default App;
