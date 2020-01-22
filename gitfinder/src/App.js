import React, {Component, Fragment } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/layout/Navbar";


class App extends Component{
    render() {
        return (
            <Fragment className="App">
            <Navbar />
            </Fragment>
        );
    }

}

export default App;
