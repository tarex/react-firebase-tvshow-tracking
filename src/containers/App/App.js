import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Button from 'react-toolbox/lib/button/Button';
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import Snackbar from 'react-toolbox/lib/snackbar/Snackbar';
import Dialog from 'react-toolbox/lib/dialog/Dialog';

import { setFCMPerssionToken } from '../../helper/firebase';

import AuthActions from '../../redux/auth/actions';
import WatchActions from '../../redux/watchlist/actions';
import ShowActions from '../../redux/show/actions';
import { getAuth } from '../../redux/auth/selectors';
import { getWatchlist } from '../../redux/watchlist/selectors';
import AppRouter from './router';

import Drawer from '../../components/Nav/drawer';
import Header from '../../components/Nav/header';
import Wrapper from '../../components/wrapper';

import './App.css';

class App extends Component {
  state = {
    drawerActive: false,
    drawerPinned: false,
    sidebarPinned: false,
  };

  componentDidMount() {
    // this.props.loadShows();
  }

  toggleDrawerActive = () => {
    this.setState({ drawerActive: !this.state.drawerActive });
  };

  handleSnackbarTimeout = (event, instance) => {
    this.props.dissmissMessage();
  };

  handleDialogToggle = () => {
    console.log('toggle');
  };

  render() {
    const {
      login,
      authenticated,
      history,
      user,
      logout,
      loading,
      isSnackBarActive,
      snackMessage,
    } = this.props;

    return (
      <ConnectedRouter history={history}>
        <Layout>
          <Drawer
            toggleDrawerActive={this.toggleDrawerActive}
            drawerActive={this.state.drawerActive}
          />
          <Panel>
            <Header
              login={login}
              logout={logout}
              loggedIn={authenticated}
              user={user}
              loading={loading}
              toggleDrawerActive={this.toggleDrawerActive}
            />
            <Wrapper>
              <Route component={AppRouter} />
            </Wrapper>
          </Panel>

          <Snackbar
            action="Dismiss"
            active={isSnackBarActive}
            label={snackMessage}
            timeout={2000}
            onClick={this.handleSnackbarTimeout}
            onTimeout={this.handleSnackbarTimeout}
            type="cancel"
          />
        </Layout>
      </ConnectedRouter>
    );
  }
}

export default connect(
  state => ({
    ...getAuth(state),
    isSnackBarActive: getWatchlist(state).successMessage !== null,
    snackMessage: getWatchlist(state).successMessage,
  }),
  {
    dissmissMessage: WatchActions.successMessageClose,
    loadShows: ShowActions.loadShows,
    login: AuthActions.login,
    logout: AuthActions.logout,
  },
)(App);

// {/*

// */}
