import React, {Component} from 'react';
import UserItem from "./UserItem";
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const User = ({users, loading}) => {

    if(loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                <div>{users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}</div>
            </div>
        );
    }
};
User.prototype = {
    users: PropTypes.array.isRequered,
    loading: PropTypes.bool.isRequered
};
const userStyle = {
    display: 'grid',
    gridTemplateColumns:  'minmax(0, auto) 1fr',
    gridGap: '60px'
};
export default User;
