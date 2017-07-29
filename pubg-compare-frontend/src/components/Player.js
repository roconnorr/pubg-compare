import React from 'react';
//import Binder from 'react-binding';
import SearchBox from './SearchBox.js';
import axios from 'axios';

const divStyle = {
    width: 250,
    height: 500,
    display: "block",
    borderStyle: "solid",
    background: "#eee",
    padding: "20px",
};

//props: playername, 
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: {} };
        this.searchPlayer = this.searchPlayer.bind(this);
        //this.searchPlayerAsync = this.searchPlayerAsync.bind(this);
    }

    /*searchPlayerAsync(name) {
        return fetch(`http://localhost:3001/api/playername/${name}`)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson.AccountId;
            })
            .catch((error) => {
                console.error(error);
            });
    }*/

    searchPlayer(heading) {
        axios.get(`http://localhost:3001/api/playername/${heading}`)
            .then(function (response) {
                alert(response.data.platformId);
            })
            .catch(function (error) {
                alert(error);
            });
    }

    render() {
        return (
            <div style={divStyle} >
                {this.props.name}
                {this.state.data.AccountId}
                < SearchBox onSubmit={this.searchPlayer} />
            </div >
        );
    }

}

export default Player;