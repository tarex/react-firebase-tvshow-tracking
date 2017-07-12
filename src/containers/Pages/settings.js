import React, { Component } from 'react';
import Switch from 'react-toolbox/lib/switch/Switch';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import Button from 'react-toolbox/lib/button/Button';

const countries = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain' },
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA' },
];

class Settings extends Component {
  handleChange = value => {
    console.log(value);
  };
  render() {
    return (
      <div>
        <h1>Settings page</h1>
        <Switch label="Don't send push notifications" />
        <Dropdown
          auto
          onChange={this.handleChange}
          source={countries}
          label="Select your timezone"
        />
        <Button label="Delete My account" raised accent />

      </div>
    );
  }
}

export default Settings;
