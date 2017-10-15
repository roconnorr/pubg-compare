import React, { Component } from "react";
import pubglogo from "./pubg-logo.jpg";

import OptionsBox from "./components/OptionsBox.js"; // eslint-disable-line no-unused-vars
import "./App.css";

class App extends Component {
    componentDidMount(){
        document.title = "PUBG COMPARE";
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={pubglogo} className="App-logo" alt="pubglogo" />
                    <h2>Welcome to PUBG COMPARE</h2>
                </div>
                <OptionsBox />
            </div>
        );
    }
}
export default App;
