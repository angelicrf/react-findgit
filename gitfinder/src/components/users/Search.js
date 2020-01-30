import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    };
    static propTypes = {
        searchUsers: PropTypes.func.isRequired
    };
    onChange = e => this.setState({
            [e.target.name]:e.target.value });
    onSubmit = e  => {e.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({
        text: ''
    })
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input name="text" placeholder="Search Users.." value={this.state.text} onChange={this.onChange} type="text"/>
                    <input name="submit" className="btn btn-dark btn-block" type="submit"/>
                </form>
            </div>
        );
    }
}

export default Search;
