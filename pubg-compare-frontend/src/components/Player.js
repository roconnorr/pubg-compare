import React from 'react';
import SearchBox from './SearchBox.js';

//import react table and style
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const divStyle = {
    width: 350,
    height: 1000,
    display: "block",
    borderStyle: "solid",
    background: "#eee",
    padding: "20px",
};

//props: playername, 
class Player extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //passes form submit event to parent
    onSubmit(event) {
        this.props.handlePlayerSearchEvent(event, this.props.childId);
    }

    render() {
        let table;
        let message;
        if (this.props.stats !== undefined) {
            table = <ReactTable data={this.makeTableData()} columns={this.makeColumnData()} />;
            message = ""
        }else{
            table = null;
            message = "No Data Found"
        }

        let error;
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
                {message}
                {table}
            </div >
        );
    }

    //extracts data from json for the table
    makeTableData() {
        var data = [];
        if (this.props.stats !== undefined) {
            for (var i = 0; i < this.props.stats[0].length; i++) {
                data[i] = {
                    "stat": this.props.stats[0][i].label,
                    "value": this.props.stats[0][i].value
                };
            }
        }
        return data;
    }

    makeColumnData() {
        var columns = [];
        if (this.props.highestInput !== undefined) {
            columns = [{
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
                                color: this.props.highestInput[row.index]
                                    === this.props.childId ? '#57d500'
                                    //else
                                    : '#ff2e00',
                                transition: 'all .3s ease'
                            }}> &#x25cf;
                        </span> {
                                row.value
                            }
                        </span>
                    )
                }]
            }];
        }
        return columns;
    }
}

export default Player;

