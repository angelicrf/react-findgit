import React, {Component, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from 'axios';
import Search from "./components/users/Search";
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component{
    state = {
        users: [],
        user: {},
        loading: false,
        repos:[],
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
       });
       setTimeout(() => this.setState({alert: null}), 5000)
    };
    getUser = async (username) => {
        this.setState({
            loading: true
        });
        const result = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            user: result.data,
            loading: false
        });
    };
    getUserRepos = async (username) => {
        this.setState({
            loading: true
        });
        const result = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        this.setState({
            repos: result.data,
            loading: false
        });
    };
    render() {
        const { users, loading , user, repos} = this.state;
        return (
            <Router>
            <div className="App">
            <Navbar />
            <Alert alert={this.state.alert}/>
                <Switch>
                    <Route exact path="/" render={props => (
                        <Fragment>
                            <Search searchUsers={this.searchUsers}
                                    clearUsers={this.clearUsers}
                                    showUser={this.state.users.length > 0 ? true :false}
                                    setAlert={this.setAlert}/>
                            <Users loading={loading} users={users} />
                        </Fragment>
                    )}/>

                    <Route exact path="/about" component={About}/>
                    <Route exact path='/user/:login' render={props => (
                        <User {...props}
                               getUser={this.getUser}
                               getUserRepos={this.getUserRepos}
                               user={user}
                               repos={repos}
                               loading={loading}/>
                    )}/>
                </Switch>
            <div className="container">

            </div>
            </div>
            </Router>
        );
    }

}

export default App;
