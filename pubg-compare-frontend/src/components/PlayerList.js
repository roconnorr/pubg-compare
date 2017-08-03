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
      highestInputProps: [],
      errorMessages: []
    };

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.handlePlayerSearchEvent = this.handlePlayerSearchEvent.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  onAddButtonClick(event) {
    const playerList = this.state.playerList;
    //Add a props object for a new player component to the list
    //passed to Player components in render
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
        //add response to child index in props array using immutability-helper
        this.setState({
          dataInputProps:
          update(this.state.dataInputProps, {
            [childId]: { $set: response.data }
          })
        });

        this.sortData();
      })
      .catch(error => {
        //do the same with error messages
        this.setState({
          errorMessages:
          update(this.state.errorMessages, {
            [childId]: { $set: error.response.data.message }
          })
        });
      });


    //var obj = this.state.dataInputProps.find(function(o){ return o.LiveTracking[0].value === res; });
    // alert(obj.AccountID);
  }

  sortData() {
    if (this.state.dataInputProps !== undefined) {
      var array = this.state.dataInputProps;
      var highestArr = [];
      //for (var i = 0; i < this.state.dataInputProps.length; i++) {
        //Solo elo compare
        var res = Math.max.apply(Math, array.map(function (o) { return o.LiveTracking[0].Value; }))
        var elementPos = array.map(function (x) { return x.LiveTracking[0].Value; }).indexOf(res);
        highestArr.push({soloElo: {data: elementPos}});
        //alert(highestArr.toString());

      //}
      this.setState({highestInputProps: highestArr});
    }
  }

  render() {
    return (
      //when the add button is clicked, call handler and make a new player object
      <div>
        <button onClick={this.onAddButtonClick}>Add input</button>
        <div>
          {this.state.playerList.map(input => {
            return <li style={liStyle}>
              <Player {...input}
                dataInput={this.state.dataInputProps[input.childId]}
                errorMsg={this.state.errorMessages[input.childId]}
                highestInputProps={this.state.highestInputProps} /></li>;
          })}
        </div>
      </div>
    );
  }
}

export default PlayerList;