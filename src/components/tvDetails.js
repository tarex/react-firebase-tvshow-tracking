import React from 'react';
import YouTube from 'react-youtube';
import Button from 'react-toolbox/lib/button/Button';
import ReactPlaceholder from 'react-placeholder';

const createMarkup = html => {
  return { __html: html };
};
const loadDefaultImage = event => {
  event.target.src = 'https://via.placeholder.com/374x331';
};

export const TvDetails = props => (
  <div>
    <div className="tvdetails">
      <div className="tvImage">
        <ReactPlaceholder
          type="rect"
          ready={props.name != null}
          showLoadingAnimation={true}>
          <img
            src={
              `${props.image ? props.image.original.replace('http://', 'https://',) : undefined}`
            }
            alt={props.name}
            onError={loadDefaultImage}
          />
        </ReactPlaceholder>
      </div>
      <div className="tvsummary">
        <div className="tvTopbar">
          <ReactPlaceholder
            rows={1}
            ready={props.name != null}
            showLoadingAnimation>
            <h2>{props.name}</h2>
          </ReactPlaceholder>

          <ReactPlaceholder
            type="media"
            ready={props.name != null}
            showLoadingAnimation>
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
          </ReactPlaceholder>
        </div>
        <ReactPlaceholder
          rows={8}
          ready={props.name != null}
          showLoadingAnimation>
          <div
            className="tvSummaryText"
            dangerouslySetInnerHTML={createMarkup(props.summary)}
          />
        </ReactPlaceholder>
        <div>
          <YouTube videoId={props.videoId} />
        </div>
      </div>
    </div>
  </div>
);
