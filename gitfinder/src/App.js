import React, {Component, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import axios from 'axios';

class App extends Component{
    state = {
        users: [],
        loading: false
    };
    async componentDidMount() {
        this.setState({
            loading: true
        });
       const result = await axios.get('https://api.github.com/users');
        this.setState({
            users: result.data,
            loading: false
        });
        console.log(this.state.users);

    }

    render() {
        return (
            <Fragment className="App">
            <Navbar />
            <div className="container">
                <User loading={this.state.loading} users={this.state.users} />
            </div>
            </Fragment>
        );
    }

}

export default App;
