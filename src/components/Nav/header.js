import React from 'react';
import { Link } from 'react-router-dom';
import Input from 'react-toolbox/lib/input/Input';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import IconMenu from 'react-toolbox/lib/menu/IconMenu';
import MenuDivider from 'react-toolbox/lib/menu/MenuDivider';
import AppBar from 'react-toolbox/lib/app_bar/AppBar';
import Avatar from 'react-toolbox/lib/avatar/Avatar';
import Navigation from 'react-toolbox/lib/navigation/Navigation';
import Button from 'react-toolbox/lib/button/Button';

const Logo = props => (
  <Link to="/" className="logo">
    <Button label="TV App" flat inverse />
  </Link>
);

export default ({ login, toggleDrawerActive, loggedIn, user, logout }) => (
  <AppBar fixed>
    <Logo />
    <Navigation type="horizontal" className="navigation">
      {loggedIn
        ? <div>
            <Link to="/watchlist">
              <Button icon="inbox" label="My List" flat inverse />
            </Link>
            {user ? <Button flat inverse>{user.displayName}</Button> : null}
            <IconMenu icon="more_vert" position="topRight" menuRipple inverse>
              <Link to="/settings">
                <MenuItem value="settings" icon="settings" caption="Settings" />
              </Link>
              <MenuDivider />
              <MenuItem
                onClick={logout}
                value="signout"
                icon="delete"
                caption="Logout"
              />
            </IconMenu>
          </div>
        : <Button onClick={login.bind(this, 'facebook')} raised>
            Login with Facebook
          </Button>}
    </Navigation>
  </AppBar>
);
