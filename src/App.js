import React, { Component } from 'react';
import './App.css';
import Instruments from './components/InstrumentsList';

function App() {
  return (
    <div className="container">
      <Instruments api="currencies.json" perPage="15" />
    </div>
  );
}

export default App;
