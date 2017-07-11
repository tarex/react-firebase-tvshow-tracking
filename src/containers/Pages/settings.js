import React, { Component } from 'react';
import Switch from 'react-toolbox/lib/switch/Switch';

class Settings extends Component {
  render() {
    return (
      <div>
        <h1>Settings page</h1>
        <Switch label="Don't send push notifications" />
      </div>
    );
  }
}

export default Settings;
