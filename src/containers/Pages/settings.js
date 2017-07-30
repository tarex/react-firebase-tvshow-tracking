import React, { Component } from 'react';
import Switch from 'react-toolbox/lib/switch/Switch';
import Autocomplete from 'react-toolbox/lib/autocomplete/Autocomplete';
import Button from 'react-toolbox/lib/button/Button';
import moment from 'moment-timezone';

const source = {
  'ES-es': 'Spain',
  'TH-th': 'Thailand',
  'EN-gb': 'England',
  'EN-en': 'USA',
};

class Settings extends Component {
  state = {
    settings: {},
  };
  handleChange = value => {
    console.log(value);
  };
  render() {
    return (
      <div>
        <h1>Settings page</h1>
        <Switch label="Don't send push notifications" />
        <Autocomplete
          direction="down"
          selectedPosition="above"
          label="Choose countries"
          onChange={this.handleChange}
          source={moment.tz.names()}
        />
        <Switch label="Send faceboo1k notifications" />
        <Button label="Delete My account" raised accent />

      </div>
    );
  }
}

export default Settings;
