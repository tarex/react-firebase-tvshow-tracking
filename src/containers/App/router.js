import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';

import Dash from '../Pages/dash';
import LandingPage from '../Pages/landing';
import Popular from '../Pages/popular';
import Recent from '../Pages/recent';
import WatchListPage from '../Pages/watchlist';
import Settings from '../Pages/settings';
import NoMatch from '../Pages/error';
import SingleTv from '../TvGrid/singleTv';

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
          <Route exact path={'/popular'} component={Popular} />
          <Route exact path={'/watchlist'} component={WatchListPage} />
          <Route exact path={'/recent'} component={Recent} />
          <Route exact path={'/settings'} component={Settings} />
          <Route exact path={'/tv/:id'} component={SingleTv} />
          <Route component={NoMatch} />
        </Switch>
        {isModal ? <Route path={'/tv/:id'} component={SingleTv} /> : null}
      </div>
    );
  }
}
