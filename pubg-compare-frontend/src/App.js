import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Player from './components/Player.js';
import PlayerList from './components/PlayerList.js';

const listStyle = {
  listStyleType: "none",
  align: "center",
  margin: 10,
  padding: 10
};

const divStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to pubg-compare</h2>
        </div>
        <div style={divStyle}>
          <ul style={listStyle}><PlayerList /></ul>
        </div>
      </div>
    );
  }
}
export default App;
