import React from "react";
import Dropdown from "react-dropdown"; // eslint-disable-line no-unused-vars
import PlayerList from "./PlayerList.js"; // eslint-disable-line no-unused-vars

const divStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const containerStyle = {
    display: "flex", 
    flexdirection: "row",
    justifyContent: "center",
    alignItems: "center",
    align: "center"
};

const listStyle = {
    listStyleType: "none",
    align: "center",
    margin: 10
};

class OptionsBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMode: { value: "solo", label: "Solo"},
            selectedRegion: { value: "agg", label: "Aggregate"},
            selectedSeason: { value: "2017-pre5", label: "2017-pre5"}
        };

        this.handleSeasonChange = this.handleSeasonChange.bind(this);
        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
    }

    handleSeasonChange(selected) {
        //console.log(value.value);
        this.setState({
            selectedSeason: { value: selected.value, label: selected.label}
        }, () => {
            this.child.updateData();
        });
    }
    
    handleRegionChange(selected) {
        this.setState({
            selectedRegion: { value: selected.value, label: selected.label}
        }, () => {
            this.child.updateData();
        });
    }
    
    handleModeChange(selected) {
        this.setState({
            selectedMode: { value: selected.value, label: selected.label}
        }, () => {
            this.child.updateData();
        });
    }

    render() {
        const regionOptions = [
            { value: "agg", label: "Aggregate" },
            { value: "as", label: "Asia" },
            { value: "eu", label: "Europe" },
            { value: "na", label: "North America" },
            { value: "oc", label: "Oceania" },
            { value: "sa", label: "South America" },
            { value: "sea", label: "South East Asia" }
        ];
        
        const regionDefault = this.state.selectedRegion;
        
        const seasonOptions = [
            { value: "2017-pre5", label: "2017-pre5" },
            { value: "2017-pre4", label: "2017-pre4" },
            { value: "2017-pre3", label: "2017-pre3" },
            { value: "2017-pre2", label: "2017-pre2" },
            { value: "2017-pre1", label: "2017-pre1" }
        ];
        
        const seasonDefault = this.state.selectedSeason;
        
        const modeOptions = [
            { value: "solo", label: "Solo" },
            { value: "duo", label: "Duo" },
            { value: "squad", label: "Squad" },
            { value: "solo-fpp", label: "Solo-FPP" },
            { value: "duo-fpp", label: "Duo-FPP" },
            { value: "squad-fpp", label: "Squad-FPP" }
        ];
        
        const modeDefault = this.state.selectedMode;

        return (
            <div>
                <div style={containerStyle}>  
                    <Dropdown options={seasonOptions} onChange={this.handleSeasonChange} value={seasonDefault} placeholder="Select an option" />
                    <Dropdown options={regionOptions} onChange={this.handleRegionChange} value={regionDefault} placeholder="Select an option" />
                    <Dropdown options={modeOptions} onChange={this.handleModeChange} value={modeDefault} placeholder="Select an option" />
              
                </div>

                <div style={divStyle}>
                    <ul style={listStyle}><PlayerList selectedMode={this.state.selectedMode.value} selectedRegion={this.state.selectedRegion.value} selectedSeason={this.state.selectedSeason.value} ref={instance => { this.child = instance; }}/></ul>
                </div>
            </div>
        );
    }
}

export default OptionsBox;