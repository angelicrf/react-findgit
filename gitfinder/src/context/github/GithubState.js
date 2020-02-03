import React, { useReducer} from 'react';
import axios from 'axios';
import githubContext from "./gihhubContext";
import githubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USERS,
    GET_REPOS
} from '../types';
const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
        repos:[]
    };
    const searchUsers = async text => {
     setLoading();
        const result = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
        &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      dispatch({
          type: SEARCH_USERS,
          payload: result.data
      })
    };
    const setLoading = () => dispatch({type: SET_LOADING});
    const [state,dispatch] = useReducer(GithubState, initialState);
    return <githubContext.provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading
    }}>
        {props.children}
    </githubContext.provider>

};

export default GithubState;
