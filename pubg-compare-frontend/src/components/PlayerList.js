import React from 'react';
import Player from './Player.js';
import axios from 'axios';

const liStyle = {
  float: "left"
};

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: []
    };

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.handlePlayerSearchEvent = this.handlePlayerSearchEvent.bind(this);

  }

  onAddButtonClick(event) {
    const playerList = this.state.playerList;
    this.setState({
    playerList: playerList.concat(<Player childId={playerList.length}
                  handlePlayerSearchEvent={this.handlePlayerSearchEvent}/>)
    });
  }

  handlePlayerSearchEvent(event, childId) {
    //use child id to make changes to specific player component
    alert(childId);
    axios.get(`http://localhost:3001/api/playername/${event}`)
      .then(response => {
        this.setState({ data: response.data });
        this.setState({ errorMsg: "" });
      })
      .catch(error => {
        this.setState({ errorMsg: error.response.data.message });
      });
  }

  render() {
    return (
      //when the add button is clicked, call the handler and make a new player object
      <div>
        <button onClick={this.onAddButtonClick}>Add input</button>
        <div>
          {this.state.playerList.map(input => {
            return <li style={liStyle}>{input}</li>;
          })}
        </div>
      </div>
    );
  }
}

export default PlayerList;