import React, {Component, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";
import axios from 'axios';
import Search from "./components/users/Search";
import Alert from './components/layout/Alert';

class App extends Component{
    state = {
        users: [],
        loading: false,
        alert: null
    };
   /* async componentDidMount() {
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
   clearUsers = () => this.setState({
       users: [],
       loading : false });

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
    setAlert = (msg, type) => {
       this.setState({
           alert: {msg, type}
       })
    };

    render() {
        const { users, loading } = this.state;
        return (
            <Fragment className="App">
            <Navbar />
            <Alert alert={this.state.alert}/>
            <div className="container">
                <Search searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showUser={this.state.users.length > 0 ? true :false}
                        setAlert={this.setAlert}/>
                <User loading={loading} users={users} />
            </div>
            </Fragment>
        );
    }

}

export default App;
