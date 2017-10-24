import React from "react";
import SearchBox from "./SearchBox.js"; // eslint-disable-line no-unused-vars
import ReactTable from "react-table"; // eslint-disable-line no-unused-vars
import "react-table/react-table.css";
import { BarLoader } from "react-spinners"; // eslint-disable-line no-unused-vars

const divStyle = {
    width: 350,
    height: 1000,
    display: "block",
    borderStyle: "solid",
    background: "#eee",
    padding: "20px",
};

const loaderStyle = {
    margin: "auto",
    padding: "20px",
    width: "35%"
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
            if (this.props.stats.length === 0) {
                table = null;
                message = "No Data Found, Have you played any games in this Season/Region/Mode?";
            } else {
                table = <ReactTable data={this.makeTableData()} columns={this.makeColumnData()} />;
                message = "";
            }
        } else {
            table = null;
            message = "";
        }

        let loading;
        if (this.props.loading === false) {
            loading = "";
        } else {
            loading = <div style={loaderStyle}>< BarLoader loading={this.props.loading} color={"#4786bb"} /></div>;
        }

        let error;
        if (this.props.errorMsg === "") {
            error = "";
        } else {
            error = this.props.errorMsg;
            message = "";
            table = null;
        }
        return (
            <div style={divStyle} >
                < SearchBox onSubmit={this.onSubmit} />
                {loading}
                <p>
                    {error}
                    {message}
                </p>
                {table}
            </div >
        );
    }

    //extracts data from json for the table
    makeTableData() {
        var data = [];
        if (this.props.stats[0] !== undefined) {
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
        if (this.props.highestInput[0] !== undefined) {
            columns = [{
                Header: "Stat",
                columns: [{
                    Header: "Stat",
                    accessor: "stat"
                }]
            }, {
                Header: "Value",
                columns: [{
                    Header: "Value",
                    accessor: "value",
                    Cell: row => (
                        <span>
                            <span style={{
                                color: this.props.highestInput[row.index]
                                    === this.props.childId ? "#57d500"
                                    //else
                                    : "#ff2e00",
                                transition: "all .3s ease"
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

