import React, { PropTypes } from 'react';
import Auth from '../modules/Auth';


class LogoutPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  componentDidMount() {
    console.log("logoutpage");
    // prevent default action. in this case, action is the form submission event

    var token = Auth.getToken();
    token = token.split(' ')[0];
    console.log("dash"+token);

    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://auth.nonstop61.hasura-app.io/user/logout');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // change the component-container state
        this.setState({
          errors: {}
        });

        Auth.deauthenticateUser();
        // change the current URL to /
        this.context.router.replace('/');
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
      }
    });
    xhr.send();
  }

  render() {
    return (<h1> You have logged out! </h1>);
  }

}

export default LogoutPage;