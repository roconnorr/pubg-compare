import React from "react";
import Axios from "axios";
import Update from "immutability-helper";
import JP from "jsonpath";
import Player from "./Player.js"; // eslint-disable-line no-unused-vars

const liStyle = {
    float: "left"
};

//contains player boxes, handles api call(currently)
class PlayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerList: [],
            statDisplayProps: [],
            highestInputProps: [],
            apiResponses: [],
            errorMessages: [],
            loading: []
        };

        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.handlePlayerSearchEvent = this.handlePlayerSearchEvent.bind(this);
        this.updateData = this.updateData.bind(this);
        this.findHighestIndex = this.findHighestIndex.bind(this);
    }

    componentDidMount() {
        this.onAddButtonClick();
    }


    onAddButtonClick() {
        const playerList = this.state.playerList;
        //Add a props object for a new player component to the list
        //passed to Player components in render
        this.setState({
            playerList: playerList.concat({
                childId: playerList.length,
                handlePlayerSearchEvent: this.handlePlayerSearchEvent
            })
        });
        //set initial loading state to false
        this.setState({
            loading: Update(this.state.loading, {
                [playerList.length]: {
                    $set: false
                }
            })
        });
    }

    handlePlayerSearchEvent(event, childId) {
        //set loading state to true for childid
        this.setState({
            loading: Update(this.state.loading, {
                [childId]: {
                    $set: true
                }
            })
        });
        Axios.get(`http://128.199.132.142:3001/api/playername/${event}`)
        //axios.get(`http://localhost:3001/api/playername/${event}`)
            .then(response => {
                //add response to child index in props array using immutability-helper
                this.setState({
                    apiResponses: Update(this.state.apiResponses, {
                        [childId]: {
                            $set: response.data
                        }
                    })
                }, () => {
                    this.updateData();
                    this.setState({
                        loading: Update(this.state.loading, {
                            [childId]: {
                                $set: false
                            }
                        })
                    });
                });
            })
            .catch(error => {
                //do the same with error messages
                this.setState({
                    errorMessages: Update(this.state.errorMessages, {
                        [childId]: {
                            $set: error.response.data.message
                        }
                    })
                });
                //set loading state to false
                this.setState({
                    loading: Update(this.state.loading, {
                        [childId]: {
                            $set: false
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
                //make query using props (props can only be from a defined set of consts)
                var queryString = "$.stats..[?(@.Season=='" + this.props.selectedSeason + "')]";
                stats = JP.query(responseArray[i], queryString);

                //get all selected region objects
                var aggregateRegion = [];
                var queryString1 = "$..[?(@.Region=='" + this.props.selectedRegion + "')]";
                aggregateRegion = JP.query(stats, queryString1);
                

                //select stats based on selectedMode
                var queryString2 = "$..[?(@.Match=='" + this.props.selectedMode + "')].Stats";
                selectedStats[i] = JP.query(aggregateRegion, queryString2);
            }

            //determine the player with the highest value for each statistic
            var highestArr = [];
            //loop all stats in array (50)
            for (var j = 0; j < 50; j++) {
                //add the returned index to the highest element props array
                highestArr[j] = this.findHighestIndex(selectedStats, j);
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
                <button onClick={this.onAddButtonClick} > Add player </button> 
                <div> 
                    
                    {this.state.playerList.map((input, index) => {
                        return <li key={index} style={liStyle} ><Player { ...input}
                            stats={this.state.statDisplayProps[input.childId]}
                            highestInput={this.state.highestInputProps}
                            mode={this.state.selectedMode}
                            loading={this.state.loading[input.childId]}
                            errorMsg={this.state.errorMessages[input.childId]}/>
                        </li >;
                    })} 
                </div> 
            </div >
        );
    }
}

export default PlayerList;