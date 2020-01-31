import React from 'react';
import '../../App.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Navbar = ({icon , title}) => {
        return (
            <nav className="navbar bg-primary">
                <h1><i className={icon}> {title}</i></h1>
                <ul className="list-group">
                    <li className="list-group-item"><Link to='/'>Home</Link></li>
                    <li className="list-group-item"><Link to='/about'>About</Link></li>
                </ul>
            </nav>
        );
};
Navbar.defaultProps = {
    title: 'GitHub Account Finder',
    icon: 'fa fa-github'
};
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

export default Navbar;
