import React, {Component} from 'react';
import UserItem from "./UserItem";

class User extends Component {

    render() {
        return (
            <div style={userStyle}>
                <div>{this.props.users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}</div>
            </div>
        );
    }

}
const userStyle = {
    display: 'grid',
    gridTemplateColumns:  'minmax(0, auto) 1fr',
    gridGap: '60px'
};
export default User;
