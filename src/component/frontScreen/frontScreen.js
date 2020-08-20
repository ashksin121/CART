import React, { Component } from "react";
import "./frontScreen.css";

import Loader from '../../assets/frontScreen.jpg';

class frontScreen extends Component {

  render() {
    
    return (
      <div className="frontScreenMain" style={{
          transform: this.props.showFront ? 'translateY(0)' : 'translateY(-100vh)'
      }}>
          <img src={Loader} alt="Loading..." />
      </div>
    );
  }
}

export default frontScreen;