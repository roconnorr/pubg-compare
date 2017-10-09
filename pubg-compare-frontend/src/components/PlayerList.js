import React from "react";
import Player from "./Player.js";
import axios from "axios";
import update from "immutability-helper";
// import Dropdown from 'react-dropdown'
import jp from 'jsonpath'

const liStyle = {
  float: "left"
};

// const divStyle = {
//   display: "inline"
// };

// const containerStyle = {
//   display: "flex", 
//   flexdirection: "row",
//   width: "100%"
// };

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      statDisplayProps: [],
      highestInputProps: [],
      apiResponses: [],
      errorMessages: []
    };

    this.onAddButtonClick = this.onAddButtonClick.bind(this);
    this.handlePlayerSearchEvent = this.handlePlayerSearchEvent.bind(this);
    this.updateData = this.updateData.bind(this);
    this.findHighestIndex = this.findHighestIndex.bind(this);
  }

  componentDidMount() {
    this.onAddButtonClick();
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
    axios.get(`http://128.199.132.142:3001/api/playername/${event}`)
    //axios.get(`http://localhost:3001/api/playername/${event}`)
      .then(response => {
        //add response to child index in props array using immutability-helper
        this.setState({
          apiResponses: update(this.state.apiResponses, {
            [childId]: {
              $set: response.data
            }
          })
        }, () => {
          this.updateData();
        });
      })
      .catch(error => {
        //do the same with error messages
        this.setState({
          errorMessages: update(this.state.errorMessages, {
            [childId]: {
              $set: error.response.data.message
            }
          })
        });
      });
  }

  updateData() {
    if (this.state.apiResponses !== undefined) {
      var responseArray = this.state.apiResponses;
      var selectedStats = [];

      for (var i = 0; i < responseArray.length; i++) {
        //get all stats objects from selected season
        var stats = [];
        switch (this.props.selectedSeason) {
          case '2017-pre4':
            stats = jp.query(responseArray[i], "$.stats..[?(@.Season=='2017-pre4')]");
            break;
          case '2017-pre3':
            stats = jp.query(responseArray[i], "$.stats..[?(@.Season=='2017-pre3')]");
            break;
          case '2017-pre2':
            stats = jp.query(responseArray[i], "$.stats..[?(@.Season=='2017-pre2')]");
            break;
          default:
            break;
        }

        //get all selected region objects
        var aggregateRegion = [];
        switch (this.props.selectedRegion) {
          case 'agg':
            aggregateRegion = jp.query(stats, "$..[?(@.Region=='agg')]");
            break;
          case 'as':
            aggregateRegion = jp.query(stats, "$..[?(@.Region=='as')]");
            break;
          case 'eu':
            aggregateRegion = jp.query(stats, "$..[?(@.Region=='eu')]");
            break;
          case 'na':
            aggregateRegion = jp.query(stats, "$..[?(@.Region=='na')]");
            break;
          case 'oc':
            aggregateRegion = jp.query(stats, "$..[?(@.Region=='oc')]");
            break;
          case 'sa':
            aggregateRegion = jp.query(stats, "$..[?(@.Region=='sa')]");
            break;
          case 'sea':
            aggregateRegion = jp.query(stats, "$..[?(@.Region=='sea')]");
            break;
          default:
            break;
        }

        //select stats based on selectedMode
        switch (this.props.selectedMode) {
          case 'solo':
            selectedStats[i] = jp.query(aggregateRegion, "$..[?(@.Match=='solo')].Stats");
            break;
          case 'duo':
            selectedStats[i] = jp.query(aggregateRegion, "$..[?(@.Match=='duo')].Stats");
            break;
          case 'squad':
            selectedStats[i] = jp.query(aggregateRegion, "$..[?(@.Match=='squad')].Stats");
            break;
          case 'solo-fpp':
            selectedStats[i] = jp.query(aggregateRegion, "$..[?(@.Match=='solo-fpp')].Stats");
            break;
          case 'duo-fpp':
            selectedStats[i] = jp.query(aggregateRegion, "$..[?(@.Match=='duo-fpp')].Stats");
            break;
          case 'squad-fpp':
            selectedStats[i] = jp.query(aggregateRegion, "$..[?(@.Match=='squad-fpp')].Stats");
            break;
          default:
            alert("unknown mode");
            break;
        }
      }

      //determine the player with the highest value for each statistic
      var highestArr = [];
      //loop all stats in array (50)
      for (var j = 0; j < 50; j++) {
        //add the returned index to the highest element props array
        highestArr[j] = this.findHighestIndex(selectedStats, j)
      }

      //add the statistic and highest value player data to state
      this.setState({
        highestInputProps: highestArr
      });
      this.setState({
        statDisplayProps: selectedStats
      });
    }
  }

  findHighestIndex(inputStats, currentIndex) {
    //Find the player with max element at the current index
    if (inputStats[currentIndex] !== undefined) {
      var res = Math.max.apply(Math, inputStats.map(function (o) {
        //only check if highest if index exists
        if (o[0] !== undefined) {
          //Check if value is stored as int or decimal
          if (o[0][currentIndex].ValueDec === null) {
            return o[0][currentIndex].ValueInt;
          } else {
            return o[0][currentIndex].ValueDec;
          }
        }
        return 0;
      }));

      //find the index of the highest value
      var elementPos = inputStats.map(function (x) {
        //only check if highest if index exists
        if (x[0] !== undefined) {
          //Check if value is stored as int or decimal
          if (x[0][currentIndex].ValueDec === null) {
            return x[0][currentIndex].ValueInt;
          } else {
            return x[0][currentIndex].ValueDec;
          }
        }
        return 0;
      }).indexOf(res);

      return elementPos;
    } else {
      return 0;
    }
  }

  render() {
    return (
      //when the add button is clicked, call handler and make a new player object
      <div>
        <button onClick = {this.onAddButtonClick}> Add player </button> 
        <div>
          {this.state.playerList.map(input => {
            return <li style={liStyle}>
              <Player {...input}
                stats={this.state.statDisplayProps[input.childId]}
                highestInput={this.state.highestInputProps}
                mode={this.state.selectedMode}
                errorMsg={this.state.errorMessages[input.childId]}
                /></li>;
          })}
        </div>
        </div>
    );
  }
}

export default PlayerList;