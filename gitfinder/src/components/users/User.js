import React, {Fragment, useEffect, useContext} from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';
import GithubContext from '../../context/github/GihhubContext';

const User = ({match}) => {

    const githubContext = useContext(GithubContext);
    const {getUser, loading, user, repos, getUserRepos } = githubContext;

    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
        },[repos]);

        const {name, avatar_url, location, bio, blog,login,html_url,company
        ,followers,following,public_repos,public_gists, hireable} = user;

       if (loading) return <Spinner/>;

       return (
            <Fragment>
       <Link to='/' className='btn btn-light'>Back to Search...</Link>
                Hireable: {''}
                {hireable ? (<i className='fa fa-check text-success' /> ):(
                    <i className='fa fa-times-circle text-danger' />)}
                    <div className="card grid-2">
                        <div className="text-center">
                            <img src={avatar_url} className="rounded-circle" style={{width: '150px'}} alt=""/>
                            <h1>{name}</h1>
                            <p>Location: {location}</p>
                        </div>
                        <div>
                            {bio && <Fragment>
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>}
                            <a href={html_url} className="btn btn-dark my-1"> Visit Github Profile</a>
                            <ul>
                                <li>{login && <Fragment>
                                    <strong>
                                        Username:
                                    </strong> {login}
                                </Fragment>}</li>
                                <li>{company && <Fragment>
                                    <strong>
                                        Company:
                                    </strong> {company}
                                </Fragment>}</li>
                                <li>{blog && <Fragment>
                                    <strong>
                                        WebSite:
                                    </strong> {blog}
                                </Fragment>}</li>
                            </ul>
                        </div>
                    </div>
                <div className="card text-center">
                    <div className="badge badge-primary" style={{width:'200px'}}>Followers: {followers}</div>
                    <div className="badge badge-success" style={{width:'200px'}}>Following: {following}</div>
                    <div className="badge badge-danger" style={{width:'200px'}}>Public Repos: {public_repos}</div>
                    <div className="badge badge-dark" style={{width:'200px'}}>Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos}/>
            </Fragment>
        );
};

export default User;
