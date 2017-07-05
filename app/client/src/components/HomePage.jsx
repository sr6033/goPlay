import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Card, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 12,
  }
}

const HomePage = () => (
	<div>
		<div className="container">
		  <a href="/"><img src="https://image.ibb.co/mOugNk/logo.png" alt="logo" border="0"/></a>
		  <br></br>
		  <h2>Want to play a game and haven't got enough players? Post and call all the game lovers around you...</h2>
		  <Link to="/login">
		  	<RaisedButton

		      label="Log in"
		      labelPosition="before"
		      style={styles.button}
		      containerElement="label"
		    />
		  </Link> {'  '}
	      <Link to="/signup">
	      	<RaisedButton
		      label="Sign up"
		      labelPosition="before"
		      style={styles.button}
		      containerElement="label"
		    />
	      </Link>
		</div>

		<div className="footer">
	    	<p>© <a href="http://sr6033.github.io/about/">Shubham Rath</a> & Saurabh Kumar | Powered by <a href="http://hasura.io/">HASURA</a></p>
	  	</div>
  	</div>
);

export default HomePage;
