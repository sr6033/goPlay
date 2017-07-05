import React, { PropTypes } from 'react';
import AddGameForm from '../components/AddGameForm.jsx';


class AddGamePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    // set the initial component state
    this.state = {
      errors: {},
      game: {
        title: '',
        place: '',
        contact: '',
        description: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeGame = this.changeGame.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const title = encodeURIComponent(this.state.game.title);
    const place = encodeURIComponent(this.state.game.place);
    const contact = encodeURIComponent(this.state.game.contact);
    const image = encodeURIComponent(this.state.game.image);
    const min_player = encodeURIComponent(this.state.game.min_player);
    const description = encodeURIComponent(this.state.game.description);
    const formData = `title=${title}&place=${place}&contact=${contact}&description=${description}&min_player=${min_player}&image=${image}`;

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/addgame');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        console.log(xhr.response.message);
        
        // make a redirect
        this.context.router.replace('/');
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

  /**
   * Change the game object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeGame(event) {
    const field = event.target.name;
    const game = this.state.game;
    game[field] = event.target.value;

    this.setState({
      game
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <AddGameForm
        onSubmit={this.processForm}
        onChange={this.changeGame}
        errors={this.state.errors}
        game={this.state.game}
      />
    );
  }

}

AddGamePage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AddGamePage;