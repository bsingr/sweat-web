import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GeoTracker from './GeoTracker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GeoTracker />
      </div>
    );
  }
}

export default App;
