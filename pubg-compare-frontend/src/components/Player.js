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
        //this.state = {};

        this.onSubmit = this.onSubmit.bind(this);
    }

    makeTableData() {
        var data;
        if (this.props.dataInput !== undefined) {
            data = [{
                "stat": "playerid",
                "value": this.props.dataInput.AccountId
            },
            {
                "stat": "KD Ratio",
                "value": this.props.dataInput.LiveTracking[0].Value
            }
            ];
        }
        return data;
    }

    //passes form submit event to parent
    onSubmit(event) {
        this.props.handlePlayerSearchEvent(event, this.props.childId);
    }

    render() {
        let table
        if (this.props.dataInput == null) {
            table = null;
        } else {
            table = <ReactTable data={this.makeTableData()} columns={columns} />;
        }

        let error
        if (this.props.errorMsg === "") {
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