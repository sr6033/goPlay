import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import LogoutPage from './containers/LogoutPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import AddGamePage from './containers/AddGamePage.jsx';
import EditPage from './containers/EditPage.jsx';
import ProfilePage from './containers/ProfilePage.jsx';
import OngoingPage from './containers/OngoingPage.jsx';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/addgame',
      component: AddGamePage
    },

    {
      path: '/ongoing',
      component: OngoingPage
    },

    {
      path: '/edit',
      component: EditPage
    },

    {
      path: '/profile',
      component: ProfilePage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        var token = Auth.getToken();
        token = token.split(' ')[0];

        Auth.deauthenticateUser();
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://auth.nonstop61.hasura-app.io/user/logout', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.responseType = 'json';
        xhr.send();

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
          // success
          console.log("Logged out.");
          }
        }); 

        // change the current URL to /
        replace('/');
      }
      
    }

  ]
};

export default routes;