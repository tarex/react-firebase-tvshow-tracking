import React from 'react';
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';

export default ({ drawerActive, toggleDrawerActive }) => (
  <NavDrawer
    active={drawerActive}
    permanentAt="xxxl"
    onOverlayClick={toggleDrawerActive}
  >
    <p>
      Navigation, account switcher, etc. go here.
    </p>
  </NavDrawer>
);
