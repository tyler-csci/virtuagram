import React, { Component } from 'react'

import PropTypes from 'prop-types';

import { BrowserRouter, Switch, Route } from "react-router-dom";

import FeedContent from '../FeedContent';
import NotFoundContent from '../NotFoundContent';

class Router extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path="/" exact>
            <FeedContent signedIn={this.props.signedIn}
                         onSignInClick={this.props.onSignInClick}
                         onSignUpClick={this.props.onSignUpClick}
                         user={this.props.user}
                         userData={this.props.userData}
            />
          </Route>

          <Route>
            <NotFoundContent />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

Router.defaultProps = {
  signedIn: false
};

Router.propTypes = {
  // Properties
  signedIn: PropTypes.bool.isRequired
};

export default Router;
