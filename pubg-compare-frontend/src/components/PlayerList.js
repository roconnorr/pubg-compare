import React from 'react';
import Player from './Player.js';
import axios from 'axios';
import update from 'immutability-helper';

const liStyle = {
  float: "left"
};

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      dataInputProps: [],
      errorMessages: []
    };

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.handlePlayerSearchEvent = this.handlePlayerSearchEvent.bind(this);
  }

  onAddButtonClick(event) {
    const playerList = this.state.playerList;
    this.setState({
      playerList: playerList.concat({
        childId: playerList.length,
        handlePlayerSearchEvent: this.handlePlayerSearchEvent
      })
    });
  }

  handlePlayerSearchEvent(event, childId) {
    axios.get(`http://localhost:3001/api/playername/${event}`)
      .then(response => {
        this.setState({ dataInputProps: update(this.state.dataInputProps, { [childId]: { $set: response.data } }) });
      })
      .catch(error => {
        this.setState({ errorMessages: update(this.state.errorMessages, { [childId]: { $set: error.response.data.message } }) });
      });
  }

  render() {
    return (
      //when the add button is clicked, call the handler and make a new player object
      <div>
        <button onClick={this.onAddButtonClick}>Add input</button>
        <div>
          {this.state.playerList.map(input => {
            return <li style={liStyle}>
              <Player {...input}
                dataInput={this.state.dataInputProps[input.childId]}
                errorMsg={this.state.errorMessages[input.childId]} /></li>;
          })}
        </div>
      </div>
    );
  }
}

export default PlayerList;