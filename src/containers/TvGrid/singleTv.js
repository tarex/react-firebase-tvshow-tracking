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
  state = {
    trailerId: null,
    showItem: null,
  };
  componentDidMount() {
    const self = this;
    const { id } = this.props.match.params;
    if (this.props.history.location.state) {
      const {
        showItem,
      } = this.props.history.location.state;
      self.loadTrailer(showItem);
    } else {
      fetch(`https://api.tvmaze.com/shows/${id}`)
        .then(res => res.json())
        .then(res => {
          self.loadTrailer(res);
        });
    }
  }
  loadTrailer = showItem => {
    const self = this;
    const search = encodeURIComponent(`${showItem.name} tv trailer`);
    const youtubeSearchUrl = `${config.youtube.url}/search?q=${search}&key=${config.youtube.apiKey}&part=snippet`;
    fetch(youtubeSearchUrl).then(res => res.json()).then(res => {
      self.setState({
        trailerId: res.items.length ? res.items[0].id.videoId : null,
        showItem,
      });
    });
  };
  addOrRmoveWatchList = () => {
    const { id } = this.props.match.params;
    const { showItem } = this.state;
    if (this.props.user != null) {
      const { uid } = this.props.user;
      this.props.updateWatchlist(uid, showItem);
    } else {
      alert('Please login');
    }
  };
  close = () => {
    this.props.history.goBack();
  };
  render() {
    const { id } = this.props.match.params;
    const {
      showItem,
    } = this.state;
    const surfaceRender = this.props.history.action === 'POP';
    const showKeys = Object.keys(this.props.myshows || {});
    const alreadyInTheList = showKeys.length && showKeys.indexOf(id) !== -1;
    const options = {
      ...showItem,
      alreadyInTheList,
      addOrRmoveWatchList: this.addOrRmoveWatchList,
      videoId: this.state.trailerId,
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
                onOverlayClick={this.close}>
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
