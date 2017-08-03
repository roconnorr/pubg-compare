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
        accessor: 'value',
        Cell: row => (
            <span>
                <span style={{
                    color: row.value === 'relationship' ? '#ff2e00'
                        : row.value === 'complicated' ? '#ffbf00'
                            : '#57d500',
                    transition: 'all .3s ease'
                }}>
                    &#x25cf;
            </span> {
                    row.value //=== 'relationship' ? 'In a relationship'
                    //: row.value === 'complicated' ? `It's complicated`
                    //: 'Single'
                }
            </span>
        )
    }]
}, {
    Header: 'Highest',
    columns: [{
        Header: 'High',
        accessor: 'highest',
        Cell: row => (
            <span>
                <span style={{
                    color: row.value === true ? '#57d500'
                        : row.value === false ? '#ff2e00'
                            : '#57d500',
                    transition: 'all .3s ease'
                }}>
                    &#x25cf;
            </span>
            </span>
        )
    }]
}]

//props: playername, 
class Player extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {};

        this.onSubmit = this.onSubmit.bind(this);
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
    //extracts data from json for the table
    makeTableData() {
        var data;
        if (this.props.dataInput !== undefined && this.props.highestInputProps[0] !== undefined) {
            //alert(this.props.highestInputProps[0].soloElo + "asdf");
            data = [{
                "stat": "playerid",
                "value": this.props.dataInput.AccountId,
                //ternary for highest: : dataInput[i].val ? something
                "highest": false
            },
            {
                "stat": "KD Ratio",
                "value": this.props.dataInput.LiveTracking[0].value,
                "highest": this.props.highestInputProps[0].soloElo.data === this.props.childId ? true
                   : false
            }
            ];
        }
        return data;
    }
}

export default Player;