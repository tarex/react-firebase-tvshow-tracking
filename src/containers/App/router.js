import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';

import LandingPage from '../Pages/landing';
import WatchListPage from '../Pages/watchlist';
import Settings from '../Pages/settings';
import NoMatch from '../Pages/error';
import SingleTv from '../TvGrid/singleTv';

const Profile = ({ match }) => (
  <div>
    <h1>Name: {match.params.profile}</h1>
  </div>
);

export default class AppRouter extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(location.state &&
      location.state.modal &&
      this.previousLocation !== location); // not initial render
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path={'/'} component={LandingPage} />
          <Route exact path={'/watchlist'} component={WatchListPage} />
          <Route exact path={'/settings'} component={Settings} />
          <Route exact path={'/tv/:id'} component={SingleTv} />
          <Route exact path={'/:profile'} component={Profile} />
        </Switch>
        {isModal ? <Route path={'/tv/:id'} component={SingleTv} /> : null}
      </div>
    );
  }
}
