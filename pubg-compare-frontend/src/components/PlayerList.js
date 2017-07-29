import React from 'react';
import Player from './Player.js';

const liStyle = {
  float: "left"
};

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: []
    };

    this.onAddBtnClick = this.onAddBtnClick.bind(this);
  }

  onAddBtnClick(event) {
    const playerList = this.state.playerList;
    this.setState({
      playerList: playerList.concat(<Player name={playerList.length} />)
    });
  }

  render() {
    return (
      //when the add button is clicked, call the handler and make a new player object
      <div>
        <button onClick={this.onAddBtnClick}>Add input</button>
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