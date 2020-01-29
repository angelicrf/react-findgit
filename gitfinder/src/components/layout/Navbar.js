import React from 'react';
import '../../App.css';
import PropTypes from 'prop-types';

const Navbar = ({icon , title}) => {
        return (
            <nav className="navbar bg-primary">
                <h1><i className={icon}> {title}</i></h1>
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
