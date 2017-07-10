import React from 'react';
import YouTube from 'react-youtube';
import Button from 'react-toolbox/lib/button/Button';

const createMarkup = html => {
  return { __html: html };
};
const loadDefaultImage = event => {
  event.target.src = 'http://via.placeholder.com/214x321';
};

export const TvDetails = props => (
  <div>
    <div className="tvdetails">
      <div>
        <img
          width="300px"
          src={`${props.image ? props.image.original : undefined}`}
          alt={props.name}
          onError={loadDefaultImage}
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
        <div dangerouslySetInnerHTML={createMarkup(props.summary)} />

        {props.videoId ? <YouTube videoId={props.videoId} /> : null}

      </div>
    </div>

  </div>
);
