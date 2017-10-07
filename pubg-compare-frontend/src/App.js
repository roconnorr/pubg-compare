import React, { Component } from 'react';
//import logo from './logo.svg';
import pubglogo from './pubg-logo-3.png';
import './App.css';
//import Player from './components/Player.js';
import PlayerList from './components/PlayerList.js';

const listStyle = {
  listStyleType: "none",
  align: "center",
  margin: 10
};

const divStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

class App extends Component {

  componentDidMount(){
    document.title = "PUBG COMPARE"
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={pubglogo} className="App-logo" alt="pubglogo" />
          <h2>Welcome to PUBG COMPARE</h2>
        </div>
        <div style={divStyle}>
          <ul style={listStyle}><PlayerList /></ul>
        </div>
      </div>
    );
  }
}
export default App;
