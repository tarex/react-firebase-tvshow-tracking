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
      <div className="tvImage">
        <img
          src={`${props.image ? props.image.original : undefined}`}
          alt={props.name}
          onError={loadDefaultImage}
        />
      </div>
      <div className="tvsummary">
        <div className="tvTopbar">
          <h2>{props.name}</h2>

          <Button
            icon={
              props.alreadyInTheList
                ? 'notifications_off'
                : 'notifications_active'
            }
            className="tvNotification"
            onClick={props.addOrRmoveWatchList}
            floating
            primary={props.alreadyInTheList == false}
          />
        </div>
        <div
          className="tvSummaryText"
          dangerouslySetInnerHTML={createMarkup(props.summary)}
        />
        {props.videoId ? <YouTube videoId={props.videoId} /> : null}
      </div>
    </div>

  </div>
);

{
  /* <Button
  onClick={props.addOrRmoveWatchList}
  primary={props.alreadyInTheList === false}>
  {props.alreadyInTheList
    ? 'Remove from watchlist'
    : 'Add to watchlist'}
</Button> */
}
