import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        text: ''
    };
    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        setAlert: PropTypes.func.isRequired,
        showUser: PropTypes.bool.isRequired
    };
    onChange = e => this.setState({
            [e.target.name]:e.target.value });
    onSubmit = e  => {
        e.preventDefault();
        if(this.state.text === '') {
            this.props.setAlert('Please enter a name', 'light')
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({
                text: ''
            })
        }

    };

    render() {
        const {clearUsers , showUser} = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input name="text" placeholder="Search Users.." value={this.state.text} onChange={this.onChange} type="text"/>
                    <input name="submit" className="btn btn-dark btn-block" type="submit"/>
                </form>

                {showUser && (
                    <button className="btn btn-light btn-block mt-4" onClick={clearUsers}>Clear</button>
                )}

            </div>
        );
    }
}

export default Search;
