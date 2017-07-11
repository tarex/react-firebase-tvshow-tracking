import React, { Component } from 'react';
import ReactPlaceholder from 'react-placeholder';
import {
  Card,
  CardMedia,
  CardTitle,
  CardText,
  CardActions,
} from 'react-toolbox/lib/card';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-toolbox/lib/button/Button';
import config from '../../config';

export default class TvGrid extends Component {
  loadDefaultImage = event => {
    event.target.src = 'https://via.placeholder.com/214x321';
  };

  handleClick = () => {
    alert('click');
  };

  showCard = (showItem, showIndex) => {
    let buttonLabel = 'Add to wishlist';
    let added = false;

    const image = showItem.image
      ? showItem.image.original.replace('http://', 'https://')
      : null;
    return (
      <div className="showItem" key={showIndex} style={{ minHeight: '320px' }}>
        <Button
          onClick={this.handleClick}
          icon="notifications_active"
          floating
          mini
        />
        <ReactPlaceholder
          type="rect"
          ready={showItem.name != null}
          showLoadingAnimation={true}>
          <Link
            to={{
              pathname: `/tv/${showItem.id}`,
              state: { modal: true, showItem },
            }}>
            <img
              src={`${image}`}
              onError={this.loadDefaultImage}
              style={{ width: '100%' }}
            />
            <h4 className="showItemTitle">{showItem.name}</h4>
          </Link>
        </ReactPlaceholder>
      </div>
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
        </div>
        <div className="tvgrid">
          {series.map(this.showCard)}
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
