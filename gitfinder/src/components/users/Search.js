import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Search = ({clearUsers , showUser,searchUsers, setAlert}) => {

   const [text, setText] = useState('');
   const onChange = e => setText(e.target.value);
   const onSubmit = e  => {
        e.preventDefault();
        if(text === '') {
           setAlert('Please enter a name', 'light')
        } else {
            searchUsers(text);
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
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    showUser: PropTypes.bool.isRequired
};
export default Search;
