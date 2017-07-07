import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-toolbox/lib/button/Button';
import Sidebar from 'react-toolbox/lib/layout/Sidebar';
import Dialog from 'react-toolbox/lib/dialog/Dialog';
import watchActions from '../../redux/watchlist/actions';
import { getAuth } from '../../redux/auth/selectors';
import { getWatchlist } from '../../redux/watchlist/selectors';
import config from '../../config';

const TvDetails = props => (
  <div>
    <Button
      icon={props.alreadyInTheList ? 'delete' : 'add'}
      onClick={props.addOrRmoveWatchList}
      primary={props.alreadyInTheList === false}
    >
      {props.alreadyInTheList ? 'Remove from watchlist' : 'Add to watchlist'}
    </Button>

    <h2>{props.name}</h2>
    {/* <img src={`${props.image.original || null}`} alt={props.name} /> */}
    <p>{props.summary}</p>
  </div>
);

class SingleTv extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
  }
  addOrRmoveWatchList = () => {
    const { id } = this.props.match.params;
    const { uid } = this.props.user;
    const {
      name,
      overview,
      poster_path,
      backdrop_path,
    } = this.props.history.location.state.showItem;
    this.props.addOrRemove(
      {
        id,
        name,
        overview,
        poster_path,
        backdrop_path,
        addedIntoWatchList: new Date().getTime(),
      },
      `/watchlist/${uid}/${id}`,
    );
  };
  close = () => {
    this.props.history.goBack();
  };
  render() {
    const { id } = this.props.match.params;
    const {
      name,
      overview,
      poster_path,
      backdrop_path,
    } = this.props.history.location.state.showItem;
    const surfaceRender = this.props.history.action === 'POP';
    const showKeys = Object.keys(this.props.myshows || {});
    const alreadyInTheList = showKeys.length && showKeys.indexOf(id) !== -1;
    const options = {
      name,
      overview,
      poster_path,
      backdrop_path,
      alreadyInTheList,
      addOrRmoveWatchList: this.addOrRmoveWatchList,
    };
    return (
      <div>
        {surfaceRender
          ? <div>
              <h2>#{id}</h2>
              <TvDetails {...options} />
            </div>
          : <div>
              <Dialog
                active={id}
                onEscKeyDown={this.close}
                onOverlayClick={this.close}
                title={options.name}
              >
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
    addOrRemove: watchActions.watchlist,
  },
)(SingleTv);
