import React, {useContext} from 'react';
import UserItem from "./UserItem";
import Spinner from '../layout/Spinner';

import GithubContext from "../../context/github/GihhubContext";

const Users = () => {

    const githubContext = useContext(GithubContext);
    const {users, loading} = githubContext;

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

const userStyle = {
    display: 'grid',
    gridTemplateColumns:  'minmax(0, auto) 1fr',
    gridGap: '60px'
};
export default Users;
