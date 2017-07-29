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
        this.state = {
            data: '',
        };
        this.searchPlayer = this.searchPlayer.bind(this);
        //this.searchPlayerAsync = this.searchPlayerAsync.bind(this);
    }

    searchPlayer(heading) {
        axios.get(`http://localhost:3001/api/playername/${heading}`)
            .then(response => {
                //var responseJson = JSON.parse(response.data);
                //alert(responseJson.Avatar);
                this.setState({ data: response.data});
            })
            .catch(function (error) {
                alert(error);
            });
    }

    render() {
        return (
            <div style={divStyle} >
                {this.props.name}
                < SearchBox onSubmit={this.searchPlayer} />
                PlayerId: {this.state.data.AccountId}
            </div >
        );
    }

}

export default Player;