import React from 'react';
import axios from 'axios';
import Header from './Header';
// import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
import BestBooks from './BestBooks'
import Profile from './components/Profile';

class App extends React.Component {

  
  render() {
    
    console.log('app', this.props);
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}

              {this.props.auth0.isAuthenticated ?
                <BestBooks />
                :
                <Login />}

              
            </Route>
            <Route exact path="/profile">
              {this.props.auth0.isAuthenticated && <Profile /> }
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
        
      </>
    );
   
    
  }
}

export default withAuth0(App);
