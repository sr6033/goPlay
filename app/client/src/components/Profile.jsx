import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText, CardActions,  CardHeader, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import Auth from '../modules/Auth';

var user = '';
var msg = '';

const style = {
	root:{
		background: "#284B63",
		'text-align': "left",
	}
};

const style2 = {
	root:{
		background: "#B4B8AB"
	}
};

const left = {
	root:{
		'text-align': "left"
	}
}

const right = {
	root:{
		'text-align': "right"
	}
}

const divStyle = {
	padding: "5px",
	background: "FFFBFA"
};


class Profile extends React.Component {
    render() {
    	if(this.props.msg == "success")
    	{
	    	var display = this.props.data.map(function(obj) {
	    		var hasimage = false;
	    		if(obj.image && obj.image != "undefined")
	    			hasimage = true;
	    		else
	    			hasimage = false;

	    		user = obj.users.name;
	            
	            var start_game = 'Start Game';

	            if(obj.ongoing == 1)
	            	start_game = "Game Started";
	            else
	            	start_game = "Start Game";

	            return <Display title={obj.title} place={obj.place} date={obj.date} contact={obj.contact} url={obj.image} hasimage={hasimage} game_id={obj.game_id}
	            				min_player={obj.min_player} counter={obj.counter} ongoing={start_game} description={obj.description} name={obj.users.name} key={obj.game_id} />
	        });
	        msg = "Hello " + user;
	    }
	    else
	    	msg = "Sorry. You have not done any game posts."

		return (
		 	<Card className="container">
				<div>
					<h2>{msg}</h2>
		 			{display}
				</div>
		  	</Card>
	  	);
	}
}

class Display extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      expanded: false,
	      start_game: this.props.ongoing,
	      delete_game: "Delete Game",
	      in: "I'm in",
	      min_player: "Minimum players: " + this.props.min_player,
	      active_player: "Players in: " + this.props.counter
	    };

	this.handleExpandChange = this.handleExpandChange.bind(this);
	this.handleToggle = this.handleToggle.bind(this);
	this.handleExpand = this.handleExpand.bind(this);
	this.handleReduce = this.handleReduce.bind(this);
	this.deletegame = this.deletegame.bind(this);
	this.startGame = this.startGame.bind(this);
	this.incCounter = this.incCounter.bind(this);

  	}


  	handleExpandChange(expanded) {
    	this.setState({expanded: expanded});
  	}

  	handleToggle(event, toggle) {
    	this.setState({expanded: toggle});
  	}

  	handleExpand() {
    	this.setState({expanded: true});
  	}

  	handleReduce() {
    	this.setState({expanded: false});
  	}

  	deletegame() {
  		var token = Auth.getToken();
    	token = token.split(' ')[0];

    	const start = encodeURIComponent(this.props.game_id);
	    const formData = `game_id=${start}`;

	    // create an AJAX request
	    const xhr = new XMLHttpRequest();
	    xhr.open('post', '/api/deletegame');
	    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    xhr.responseType = 'json';
	    xhr.addEventListener('load', () => {
	      if (xhr.status === 200) {
	        // success

	        // change the component-container state
	        this.setState({
	          errors: {},
	          delete_game: "Game Deleted"
	        });

	      } else {
	        // failure

	        const errors = xhr.response.errors ? xhr.response.errors : {};
	        errors.summary = xhr.response.message;

	        this.setState({
	          errors
	        });
	      }
	    });
	    xhr.send(formData);
  	}

  	incCounter() {
    	var token = Auth.getToken();
    	token = token.split(' ')[0];

    	const start = encodeURIComponent(this.props.game_id);
	    const formData = `game_id=${start}`;

	    // create an AJAX request
	    const xhr = new XMLHttpRequest();
	    xhr.open('post', '/api/inccounter');
	    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    xhr.responseType = 'json';
	    xhr.addEventListener('load', () => {
	      if (xhr.status === 200) {
	        // success

	        // change the component-container state
	        this.setState({
	          errors: {},
	          in: "You're in"
	        });

	      } else {
	        // failure

	        const errors = xhr.response.errors ? xhr.response.errors : {};
	        errors.summary = xhr.response.message;

	        this.setState({
	          errors
	        });
	      }
	    });
	    xhr.send(formData);
  	}

  	startGame() {
  		var token = Auth.getToken();
    	token = token.split(' ')[0];

    	const start = encodeURIComponent(this.props.game_id);
	    const formData = `game_id=${start}`;

	    // create an AJAX request
	    const xhr = new XMLHttpRequest();
	    xhr.open('post', '/api/startgame');
	    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    xhr.responseType = 'json';
	    xhr.addEventListener('load', () => {
	      if (xhr.status === 200) {
	        // success

	        // change the component-container state
	        this.setState({
	          errors: {},
	          start_game: "Game Started"
	        });

	      } else {
	        // failure

	        const errors = xhr.response.errors ? xhr.response.errors : {};
	        errors.summary = xhr.response.message;

	        this.setState({
	          errors
	        });
	      }
	    });
	    xhr.send(formData);
  	}

    render() {
        return (
        	<div style={divStyle}>
            	<Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={style2.root}>
			        <CardHeader
			          titleColor="#FFFBFA"
			          subtitleColor="#EAE7DA"
			          title={this.props.title}
			          subtitle={this.props.place}
			          //avatar="images/ok-128.jpg"
			          actAsExpander={true}
			          showExpandableButton={true}
			          style={style.root}
			        />
			        <CardText>
			          <Toggle
			            toggled={this.state.expanded}
			            onToggle={this.handleToggle}
			            labelPosition="right"
			            label="Click to read details."
			            style={left.root}
			          />
			        </CardText>
			        <CardMedia
			          expandable={true}
			          overlay={<CardTitle title={this.props.name} subtitle={this.props.contact} />}
			        >

					<img src={(this.props.hasimage)? this.props.url : 
						"https://s-media-cache-ak0.pinimg.com/originals/e1/fe/ef/e1feefd9107ced829982d503199dea1d.png"} alt="" />

			        </CardMedia>
			        <CardTitle title={this.state.min_player} subtitle={this.state.active_player} expandable={true} />
			        <CardText expandable={true}>
			        	{this.props.description}
			        </CardText>
			        <CardActions style={right.root}>
			          <FlatButton label={this.state.in} onTouchTap={this.incCounter} />
			          <FlatButton label={this.state.start_game} onTouchTap={this.startGame} />
			          <FlatButton label={this.state.delete_game} onTouchTap={this.deletegame} />
			        </CardActions>
			    </Card>
		    </div>
        );
    }
}

export default Profile;