import React, { useReducer} from 'react';
import axios from 'axios';
import GithubContext from "./GihhubContext";
import GithubReducer from './githubReducer';

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USERS,
    GET_REPOS
} from '../types';
let githubClientId;
let githubCLientSecret;

if(process.env.NODE_ENV !== 'production') {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubCLientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubCLientSecret = process.env.GITHUB_CLIENT_SECRET;
}
const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        loading: false,
        repos:[]
    };
    const [state,dispatch] = useReducer(GithubReducer, initialState);

    const searchUsers = async text => {
     setLoading();
        const result = await axios.get(`https://api.github.com/search/users?q=${text}&
        client_id=${githubClientId}
        &client_secret=${githubCLientSecret}`);
      dispatch({
          type: SEARCH_USERS,
          payload: result.data.items
      })
    };
    const getUser = async (username) => {
        setLoading();
        const result = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}
            &client_secret=${githubCLientSecret}`);
        dispatch({
            type: GET_USERS,
            payload: result.data
        })
    };
    const getUserRepos = async (username) => {
        setLoading();
        const result = await axios.get(`https://api.github.com/users/${username}/
        repos?per_page=5&sort=created:asc&client_id=${githubClientId}
        &client_secret=${githubCLientSecret}`);
        dispatch({
            type: GET_REPOS,
            payload: result.data
        })

    };
    const clearUsers = () => dispatch({type: CLEAR_USERS});
    const setLoading = () => dispatch({type: SET_LOADING});
    return <GithubContext.Provider
        value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
    }}>
        {props.children}
    </GithubContext.Provider>

};

export default GithubState;
