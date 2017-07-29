import React from 'react';

class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
        // init state
        this.state = {
            input: "blank"
        };
    }
    
    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.input);
    }

    onInput(event) {
        this.setState({
            input: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>
                    Player Name:
                    <input
                        // use value and onChange so it will be a controlled component
                        value={this.state.value}
                        onChange={this.onInput}
                        type="text"
                        placeholder="Type your text here" />
                </label>
                <button type="submit">Add to list</button>
            </form>
        );
    }
}
export default SearchBox;
