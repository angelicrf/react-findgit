import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from "../../context/github/GihhubContext";

const Search = ({clearUsers , showUser, setAlert}) => {

    const githubContext = useContext(GithubContext);
   const [text, setText] = useState('');
   const onChange = e => setText(e.target.value);
   const onSubmit = e  => {
        e.preventDefault();
        if(text === '') {
           setAlert('Please enter a name', 'light')
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
    };

        return (
            <div>
                <form onSubmit={onSubmit} className="form">
                    <input name="text" placeholder="Search Users.." value={text} onChange={onChange} type="text"/>
                    <input name="submit" className="btn btn-dark btn-block" type="submit"/>
                </form>

                {showUser && (
                    <button className="btn btn-light btn-block mt-4" onClick={clearUsers}>Clear</button>
                )}

            </div>
        );
};
Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    showUser: PropTypes.bool.isRequired
};
export default Search;
