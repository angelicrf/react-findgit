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

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

   const showAlert = (msg, type) => {
       setAlert({msg ,type});
       setTimeout(() => setAlert(null), 5000)
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
                                    setAlert={showAlert}/>
                            <Users loading={loading} />
                        </Fragment>
                    )}/>

                    <Route exact path="/about" component={About}/>
                    <Route exact path='/user/:login' render={props => (
                        <User {...props}
                               getUserRepos={getUserRepos}
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
