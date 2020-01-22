import React, {Component, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/layout/Navbar";
import User from "./components/users/User";


class App extends Component{
    render() {
        return (
            <Fragment className="App">
            <Navbar />
            <div className="container">
                <User />
            </div>
            </Fragment>
        );
    }

}

export default App;
