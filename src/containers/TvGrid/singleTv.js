import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-toolbox/lib/button/Button';
import Sidebar from 'react-toolbox/lib/layout/Sidebar';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import watchActions from '../../redux/watchlist/actions';
import { getAuth } from '../../redux/auth/selectors';
import { getWatchlist } from '../../redux/watchlist/selectors';
import { TvDetails } from '../../components/tvDetails';
import config from '../../config';

class SingleTv extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
  }
  addOrRmoveWatchList = () => {
    const { id } = this.props.match.params;
    const {
      showItem,
    } = this.props.history.location.state;
    if (this.props.user != null) {
      const { uid } = this.props.user;
      this.props.updateWatchlist(uid, showItem);
    } else {
      alert('Please login -> ');
    }
  };
  close = () => {
    this.props.history.goBack();
  };
  render() {
    const { id } = this.props.match.params;
    const {
      showItem,
    } = this.props.history.location.state;
    const surfaceRender = this.props.history.action === 'POP';
    const showKeys = Object.keys(this.props.myshows || {});
    const alreadyInTheList = showKeys.length && showKeys.indexOf(id) !== -1;
    const options = {
      ...showItem,
      alreadyInTheList,
      addOrRmoveWatchList: this.addOrRmoveWatchList,
    };
    return (
      <div>
        {surfaceRender
          ? <div>
              <TvDetails {...options} />
            </div>
          : <div>
              <Dialog
                active={id ? true : false}
                onEscKeyDown={this.close}
                onOverlayClick={this.close}
                title={options.name}>
                <TvDetails {...options} />
              </Dialog>
            </div>}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: getAuth(state).user,
    myshows: getWatchlist(state).myshows,
  }),
  {
    updateWatchlist: watchActions.watchlist,
  },
)(SingleTv);
