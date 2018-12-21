import React, { Component } from 'react';
import './App.css';
import Instruments from './components/Instruments';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Instruments />
      </div>
    );
  }
}

export default App;
