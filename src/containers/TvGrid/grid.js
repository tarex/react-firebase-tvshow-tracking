import React, { Component } from 'react';
import ReactPlaceholder from 'react-placeholder';
import { Link } from 'react-router-dom';
import Button from 'react-toolbox/lib/button/Button';

export default class TvGrid extends Component {
  loadDefaultImage = event => {
    event.target.src = 'https://via.placeholder.com/214x321';
  };

  handleClick = () => {};

  showCard = (showItem, showIndex) => {
    const image = showItem.image
      ? showItem.image.original.replace('http://', 'https://')
      : null;
    return (
      <div className="showItem" key={showIndex} style={{ minHeight: '320px' }}>
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
              alt={showItem.name}
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
