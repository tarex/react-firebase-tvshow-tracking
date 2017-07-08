import React from 'react';
import renderHTML from 'react-render-html';
import Button from 'react-toolbox/lib/button/Button';

export const TvDetails = props => (
  <div>
    <div className="tvdetails">
      <div>
        <img
          width="300px"
          src={`${props.image.original || null}`}
          alt={props.name}
        />
      </div>
      <div className="tvsummary">
        <Button
          icon={
            props.alreadyInTheList
              ? 'notifications_off'
              : 'notifications_active'
          }
          onClick={props.addOrRmoveWatchList}
          floating
          primary={props.alreadyInTheList == false}
        />
        <Button
          onClick={props.addOrRmoveWatchList}
          primary={props.alreadyInTheList === false}>
          {props.alreadyInTheList
            ? 'Remove from watchlist'
            : 'Add to watchlist'}
        </Button>
        <h2>{props.name}</h2>
        {renderHTML(props.summary)}
      </div>
    </div>

  </div>
);
