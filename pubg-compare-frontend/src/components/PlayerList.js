import React from 'react';
import Player from './Player.js';
import axios from 'axios';
import update from 'immutability-helper';
import { RadioGroup, Radio } from 'react-radio-group'
import jp from 'jsonpath'

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
      errorMessages: [],
      selectedMode: 'solo',
      statDisplayProps: []
    };

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.handlePlayerSearchEvent = this.handlePlayerSearchEvent.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
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

  handleRadioChange(value) {
    this.setState({ selectedMode: value }, () => {
      this.updateData();
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
        }, () => {
          this.updateData();
        });
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
  }

  updateData() {
    if (this.state.dataInputProps !== undefined) {
      var array = this.state.dataInputProps;

      //var stats = [];
      //var aggregateRegion = [];
      var selectedStats = [];

      for (var i = 0; i < array.length; i++) {
        //get all stats objects from current season (TODO: season select)
        var stats = jp.query(array[i], "$.Stats..[?(@.Season=='2017-pre3')]");
        //get all agg region objects
        //TODO: implement region select
        var aggregateRegion = jp.query(stats, "$..[?(@.Region=='agg')]");

        //select stats based on selectedMode
        switch (this.state.selectedMode) {
          case 'solo':
            selectedStats[i] = jp.query(aggregateRegion, "$..[?(@.Match=='solo')].Stats");
            break;
          case 'duo':
            selectedStats[i] = jp.query(aggregateRegion, "$..[?(@.Match=='duo')].Stats");
            break;
          case 'squad':
            selectedStats[i] = jp.query(aggregateRegion, "$..[?(@.Match=='squad')].Stats");
            break;
          default:
            alert("unknown mode");
            break;
        }
      }

      //calculate highest for each
      var highestArr = [];

      //first for loop: loop results (50)
      //second for loop = keep vars and loop all players, set vars each time to determine highest and add
      //to highestarr

      //alert(selectedStats[0][0].length);

      for (var j = 0; j < selectedStats[0][0].length; j++) {
        //Find the max element of all players at the current index
        var res = Math.max.apply(Math, selectedStats.map(function (o) {
          if (o[0][j].ValueDec === null) {
            return o[0][j].ValueInt;
          } else {
            return o[0][j].ValueDec;
          }
        }));

        //find the index of the highest value
        var elementPos = selectedStats.map(function (x) {
          if (x[0][j].ValueDec === null) {
            return x[0][j].ValueInt;
          } else {
            return x[0][j].ValueDec;
          }
        }).indexOf(res);

        //add the index to the highest element props array
        highestArr[j] = elementPos;
      }

      //alert(JSON.stringify(selectedStats[0][0][0].value));
      //Solo elo compare
      //now working yo - need to check if int or dec is null and decide which one to use
      //for (var k = 0; k < selectedStats.length; k++) {

      //}
      //highestArr.push({ soloElo: { data: elementPos } });
      //alert(res);
      //alert(elementPos);

      this.setState({ highestInputProps: highestArr });
      this.setState({ statDisplayProps: selectedStats });
    }
  }

  render() {
    return (
      //when the add button is clicked, call handler and make a new player object
      <div>
        Mode:
        <RadioGroup name="Mode" selectedValue={this.state.selectedMode} onChange={this.handleRadioChange}>
          <Radio value="solo" />Solo
          <Radio value="duo" />Duo
          <Radio value="squad" />Squad
        </RadioGroup>
        <button onClick={this.onAddButtonClick}>Add input</button>
        <div>
          {this.state.playerList.map(input => {
            return <li style={liStyle}>
              <Player {...input}
                dataInput={this.state.dataInputProps[input.childId]}
                errorMsg={this.state.errorMessages[input.childId]}
                highestInputProps={this.state.highestInputProps}
                mode={this.state.selectedMode}
                stats={this.state.statDisplayProps[input.childId]} /></li>;
          })}
        </div>
      </div>
    );
  }
}

export default PlayerList;