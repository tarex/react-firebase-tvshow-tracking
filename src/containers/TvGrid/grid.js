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
import Button from 'react-toolbox/lib/button/Button';
import config from '../../config';

export default class TvGrid extends Component {
  loadDefaultImage = event => {
    event.target.src = 'http://via.placeholder.com/214x321';
  };

  handleClick = () => {
    alert('click');
  };

  showCard = (showItem, showIndex) => {
    let buttonLabel = 'Add to wishlist';
    let added = false;

    const image = showItem.image ? showItem.image.original : null;
    return (
      <div className="showItem" key={showIndex}>
        <Button
          onClick={this.handleClick}
          icon="notifications_active"
          floating
          mini
        />
        <Link
          to={{
            pathname: `/tv/${showItem.id}`,
            state: { modal: true, showItem },
          }}>
          <Card>
            <img
              src={`${image}`}
              style={{ width: '100%' }}
              onError={this.loadDefaultImage}
            />

            <h4 className="showItemTitle">{showItem.name}</h4>
          </Card>
        </Link>
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

{
  /* <Link
  className="showItem"
  key={showIndex}
  to={{
    pathname: `/tv/${showItem.id}`,
    state: { modal: true, showItem },
  }}> */
}
