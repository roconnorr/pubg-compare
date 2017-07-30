import React from 'react';
//import Binder from 'react-binding';
import SearchBox from './SearchBox.js';

//import react table and style
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const divStyle = {
    width: 300,
    height: 500,
    display: "block",
    borderStyle: "solid",
    background: "#eee",
    padding: "20px",
};

const columns = [{
    Header: 'Stat',
    columns: [{
        Header: 'Stat',
        accessor: 'stat'
    }]
}, {
    Header: 'Value',
    columns: [{
        Header: 'Value',
        accessor: 'value'
    }]
}]

//props: playername, 
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            errorMsg: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    makeTableData() {
        var data = [{
            "stat": "playerid",
            "value": this.state.data.AccountId
        },
        {
            "stat": "KD Ratio",
            "value": this.state.data.LiveTracking[0].Value
        }
        ];
        return data;
    }

    onSubmit(event) {
        this.props.handlePlayerSearchEvent(event, this.props.childId);
    }

    render() {
        let table
        if (this.state.data == null) {
            table = null;
        } else {
            table = <ReactTable data={this.makeTableData()} columns={columns} />;
        }

        let error
        if (this.props.errorMsg == "") {
            error = "";
        } else {
            error = this.props.errorMsg;
        }
        return (
            <div style={divStyle} >
                {this.props.childId}
                < SearchBox onSubmit={this.onSubmit} />
                {error}
                {table}
            </div >
        );
    }
}

export default Player;