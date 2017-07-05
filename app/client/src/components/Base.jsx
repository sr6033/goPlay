import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';
import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

const iconStyles = {
  marginRight: 24,
};

const Base = ({ children }) => (
  <div>
    <div className="top-bar">

      {Auth.isUserAuthenticated() ? (
        <div>
        <div className="top-bar-left">
          <IndexLink to="/">goPlay</IndexLink>
        </div>

        <div className="top-bar-right">
          <Link to="/addgame">Add Game</Link> |
          <Link to="/ongoing">Ongoing Games</Link> |
          <Link to="/profile">Profile</Link> | 
          <Link to="/edit">Edit</Link> | 
          <Link to="/logout">Log out</Link>
        </div>
        </div>
      ) : (
        <div className="top-bar-right">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}

    </div>

    { /* child component will be rendered here */ }
    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;