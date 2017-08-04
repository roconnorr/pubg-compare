import React from 'react';
//import Binder from 'react-binding';
import SearchBox from './SearchBox.js';

//import react table and style
import ReactTable from 'react-table'
import 'react-table/react-table.css'

const divStyle = {
    width: 500,
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
        this.state = {data: []};

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
            table = <ReactTable data={this.makeTableData()} columns={this.makeColumnData()} />;
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
        var data = [];
        if (this.props.stats !== undefined/* && this.props.highestInputProps[0] !== undefined*/) {
            //alert(this.props.highestInputProps[0].soloElo + "asdf");

            for (var i = 0; i < this.props.stats[0].length; i++) {
                data[i] = {
                    "stat": this.props.stats[0][i].label,
                    "value": this.props.stats[0][i].value,
                    //ternary for highest: : dataInput[i].val ? something
                    "highest": false
                };
            }
            //this.setState({data: data});
            /*data = [{
                "stat": "playerid",
                "value": this.props.stats[0][0].value,
                //ternary for highest: : dataInput[i].val ? something
                "highest": false
            },
            {
                "stat": "KD Ratio",
                "value": this.props.stats[0][0].value,
                //"highest": this.props.highestInputProps[0].kda.data === this.props.childId ? true
                //  : false
                "highest": true
            }
            ];*/
        }
        return data;
    }

    makeColumnData() {
        var columns = [{
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
                        }}> &#x25cf;
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
                        }}> &#x25cf;
                        </span>
                    </span>
                )
            }]
        }];
        return columns;
    }
}

export default Player;

