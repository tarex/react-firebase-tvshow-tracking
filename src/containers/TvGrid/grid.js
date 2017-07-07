import React, { Component } from 'react';
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions,
} from 'react-toolbox/lib/card';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { addOrRemove } from '../../reducers/watchlist';
// import { firebaseDB } from '../../helper/firebase';
import Button from 'react-toolbox/lib/button/Button';
import config from '../../config';

export default class TvGrid extends Component {
  handleWatchList = showItem => {
    const { uid } = this.props.user;
    const uniqueRef = `watchlist/${uid}/${showItem.ids.tvdb}`;
    const data = {
      uid,
      ...showItem.ids,
      ...showItem,
    };
    this.props.addOrRemove(data, uniqueRef);
  };

  loadDefaultImage = event => {
    event.target.src = 'http://via.placeholder.com/214x321';
  };

  showCard = (showItem, showIndex) => {
    let buttonLabel = 'Add to wishlist';
    let added = false;

    const image = showItem.image ? showItem.image.original : null;
    return (
      <Link
        className="showItem"
        key={showIndex}
        to={{
          pathname: `/tv/${showItem.id}`,
          state: { modal: true, showItem },
        }}
      >
        <Card>
          <img
            src={`${image}`}
            style={{ width: '100%' }}
            onError={this.loadDefaultImage}
          />
          <h4 className="showItemTitle">{showItem.name}</h4>
        </Card>
      </Link>
    );
  };

  render() {
    const {
      series,
      title,
      type,
      loadMore,
      showLoadMore,
      showViewAll,
    } = this.props;
    return (
      <div>
        <div className="tvTitle">
          <h2>{title}</h2>
          {showViewAll ? <a href="#">View All</a> : null}
        </div>
        <div className="tvgrid">
          {series && series.length ? series.map(this.showCard) : null}
        </div>
        {showLoadMore
          ? <div className="loadMore">
              <Button raised primary onClick={loadMore.bind(this, type)}>
                Load More
              </Button>
            </div>
          : null}
      </div>
    );
  }
}

//
// <Link
//   to={{
//     pathname: `/tv/${showItem.id}`,
//     state: { modal: true, showItem },
//   }}
// >
