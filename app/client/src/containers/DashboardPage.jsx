import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      game_id: null,
      title: '',
      time: null,
      place: '',
      contact: '',
      min_player: '',
      counter: '',
      date: '',
      description: ''
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    var token = Auth.getToken();
    token = token.split(' ')[0];
    
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        //console.log("response: " + xhr.response);
        this.setState({
          data: xhr.response,
          message: "Hello player!"
        });
      }
    });
    xhr.send();
  }

  /**
   * Render the component.
   */
  render() {
    //return (<Dashboard data={this.state.message} />);
    return (<Dashboard data={this.state.data} />);
  }

}


export default DashboardPage;