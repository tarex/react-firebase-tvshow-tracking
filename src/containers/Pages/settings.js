import React, { Component } from 'react';
import { messaging, FirebaseDB } from '../../helper/firebase';

class Settings extends Component {
  state = {
    notification: null,
  };
  componentWillMount() {
    this.getFCMPermission();
  }
  componentDidMount() {
    this.listenFCMNotification();
  }

  checkDB = () => {
    const dummySeriesUser = {
      84: {
        token: {
          'eofhGt3oug8:APA91bEiSyQ07zdRzY89KGIdPkwr0VJi52GbSUiYO9kRGiUM5QyLljD8jsIzoZaHbblBD07xY_3TqdWY_kGwv-TcFSirUgXJCFwxurXwtfI69JTG4rJx_6cKvO-0gA1U4N8TFK_YrRhl': true,
          'fnhy808yY1k:APA91bFaNBGWIr6jA4kI_2pMdh7xXnAP5msbYhgbSseP0zhjyCDxpR8QezTlE5zwSXVpNuDkQwI_he8Bd8s8h1QRo2rRNXO2T0NErkRUKEPxdRitqH-1QVRgVuJYIEeCNk7AaXioVNFd': true,
        },
      },
      3097: {
        token: {
          'eofhGt3oug8:APA91bEiSyQ07zdRzY89KGIdPkwr0VJi52GbSUiYO9kRGiUM5QyLljD8jsIzoZaHbblBD07xY_3TqdWY_kGwv-TcFSirUgXJCFwxurXwtfI69JTG4rJx_6cKvO-0gA1U4N8TFK_YrRhl': true,
          'fnhy808yY1k:APA91bFaNBGWIr6jA4kI_2pMdh7xXnAP5msbYhgbSseP0zhjyCDxpR8QezTlE5zwSXVpNuDkQwI_he8Bd8s8h1QRo2rRNXO2T0NErkRUKEPxdRitqH-1QVRgVuJYIEeCNk7AaXioVNFd': true,
        },
      },
    };
    FirebaseDB.ref('dummySeriesUser').set(dummySeriesUser);
  };
  render() {
    const { notification } = this.state;
    return (
      <div>
        <h1>Settings page</h1>
        <button onClick={this.checkDB}>check db</button>
        <pre>{notification && JSON.stringify(notification, null, 2)}</pre>

      </div>
    );
  }
}

export default Settings;
