import React from 'react';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import { List, ListItem } from 'react-toolbox/lib/list';
import { Link } from 'react-router-dom';

export default (
  { drawerActive, toggleDrawerActive, login, logout, user, loggedIn },
) => (
  <NavDrawer
    active={drawerActive}
    permanentAt="xxxl"
    onOverlayClick={toggleDrawerActive}>
    <div className="mobileNav">
      {loggedIn
        ? <List selectable ripple>
            <Link className="mobileNavItem" to="watchlist">
              <ListItem caption={user.displayName} leftIcon="fingerprint" />
            </Link>
            <Link className="mobileNavItem" to="watchlist">
              <ListItem caption="Watchlist" leftIcon="playlist_add_check" />
            </Link>
            <Link className="mobileNavItem" to="settings">
              <ListItem caption="Settings" leftIcon="settings" />
            </Link>
            <ListItem
              onClick={logout}
              caption="Logout"
              leftIcon="power_settings_new"
            />
          </List>
        : <List selectable ripple>
            <ListItem
              onClick={login.bind(this, 'facebook')}
              caption="Login With Facebook"
              leftIcon="phonelink_lock"
            />
          </List>}
    </div>
  </NavDrawer>
);
