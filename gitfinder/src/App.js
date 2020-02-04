import React, { Fragment , useState } from 'react';
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
import GithubState from "./context/github/GithubState";


const App = () => {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

   const clearUsers = () => {
       setUsers([]);
       setLoading(false);
   };

   const showAlert = (msg, type) => {
       setAlert({msg ,type});
       setTimeout(() => setAlert(null), 5000)
    };
   const getUser = async (username) => {
       setLoading(true);
            const result = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
       setUser(result.data);
       setLoading(false);
    };
   const getUserRepos = async (username) => {
       setLoading(true);
        const result = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
       setRepos(result.data);
       setLoading(false);
    };

        return (
            <GithubState>
            <Router>
            <div className="App">
            <Navbar />
            <Alert alert={alert}/>
                <Switch>
                    <Route exact path="/" render={props => (
                        <Fragment>
                            <Search
                                    clearUsers={clearUsers}
                                    showUser={users.length > 0 ? true :false}
                                    setAlert={showAlert}/>
                            <Users loading={loading} users={users} />
                        </Fragment>
                    )}/>

                    <Route exact path="/about" component={About}/>
                    <Route exact path='/user/:login' render={props => (
                        <User {...props}
                               getUser={getUser}
                               getUserRepos={getUserRepos}
                               user={user}
                               repos={repos}
                               loading={loading}/>
                    )}/>
                </Switch>
            <div className="container">

            </div>
            </div>
            </Router>
            </GithubState>
        );

};

export default App;
