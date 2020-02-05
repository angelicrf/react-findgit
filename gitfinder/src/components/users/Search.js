import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from "../../context/github/GihhubContext";

const Search = ({setAlert}) => {

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

                {githubContext.users.length > 0 && (
                    <button className="btn btn-light btn-block mt-4" onClick={githubContext.clearUsers}>Clear</button>
                )}

            </div>
        );
};
Search.propTypes = {
    showUser: PropTypes.bool.isRequired
};
export default Search;
