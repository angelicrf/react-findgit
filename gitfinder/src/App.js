import React, {Component, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import axios from 'axios';
import Search from "./components/users/Search";

class App extends Component{
    state = {
        users: [],
        loading: false
    };
/*    async componentDidMount() {
        console.log('the process is: ', process.env.REACT_APP_GITHUB_CLIENT_SECRET);
        this.setState({
            loading: true
        });
       const result = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            users: result.data,
            loading: false
        });
    }*/
    searchUsers = async text => {
        this.setState({
            loading: true
        });
        const result = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            users: result.data.items,
            loading: false
        });
    };
    render() {
        return (
            <Fragment className="App">
            <Navbar />
            <div className="container">
                <Search searchUsers={this.searchUsers}/>
                <User loading={this.state.loading} users={this.state.users} />
            </div>
            </Fragment>
        );
    }

}

export default App;
