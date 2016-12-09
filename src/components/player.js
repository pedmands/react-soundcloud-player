import React, { PropTypes, Component } from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, PrevButton, NextButton, Progress, Timer, VolumeControl } from 'react-soundplayer/components';
import { Icons } from 'react-soundplayer/components';



const clientId = '08f79801a998c381762ec5b15e4914d5';
const streamUrl = 'https://soundcloud.com/pedmands/before-he-goes';
const markUrl = 'https://soundcloud.com/markhphillips/sets/original-score-from-serial-mark-h-phillips';

class CustomPlayer extends React.Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0,
            condition: false
        };
    }
    play(e) {
        let { soundCloudAudio, playing } = this.props;
        if (playing) {
            soundCloudAudio.pause(e);
        } else {
            soundCloudAudio.play(e);
        }
    }
    playTrackAtIndex(playlistIndex) {
        let { soundCloudAudio } = this.props;
        this.setState({activeIndex: playlistIndex});
        soundCloudAudio.play({ playlistIndex });
        this.setState( { condition : !this.state.condition } );
    }
    prevIndex(e) {
        let { activeIndex } = this.state;
        if (activeIndex <= 0) {
            return;
        }
          const { soundCloudAudio, onPrevClick } = this.props;

        this.setState({activeIndex: --activeIndex});

        soundCloudAudio && soundCloudAudio.previous();
        onPrevClick && onPrevClick(e);

    }
    nextIndex(e) {
        let { activeIndex } = this.state;
        let { playlist } = this.props;
        if (activeIndex >= playlist.tracks.length - 1) {
            return;
        }
        const { soundCloudAudio, onNextClick } = this.props;

        this.setState({activeIndex: activeIndex + 1});

        soundCloudAudio && soundCloudAudio.next();
        onNextClick && onNextClick(e);

    }
    renderTrackList() {
      let {playlist} = this.props;

      const tracks = playlist.tracks.map((track, i) => {
        let classNames = "playlist-item";
        if (this.state.activeIndex === i) {
          classNames = "playlist-item active";
        }

        return (
          <li
            key={track.id}
            onClick={this.playTrackAtIndex.bind(this, i)}
            className={classNames}
          >
            {i + 1}. {track.title}
          </li>
        );
      });
      return (
          <ol className={this.state.condition ? "playlist" :"playlist hide"}>{tracks}</ol>
      );
    }// renderTrackList
    handleClick(){
        this.setState( { condition : !this.state.condition } );
    }
    render() {
        let { track, playing, playlist, duration, currentTime } = this.props;
        let { activeIndex } = this.state;

        console.log(playlist);
        if (!playlist) {
          return <div className="loader"> Loading... </div>;
        }
          let activeTrack = playlist.tracks[activeIndex];
          const cover = 'https://static1.squarespace.com/static/5179f704e4b0f0be01c191ad/t/5492e756e4b087ef8e0508f1/1418913622786/?format=750w';
          const url = activeTrack.permalink_url;
          const logo = 'http://dev.bowdenweb.com/a/i/cons/icomoon/soundcloud1.png';

          return (
            <div>
            <div className="cover"><img src={cover} /></div>
            <div className="track-info">
                <h1>{activeTrack.title}</h1>
                <h2>{activeTrack.user.username}</h2>
                <div className="meta">
                  <span><a href={url}><img className="sc_logo" src={logo} /></a></span>
                  <span><i className="fa fa-play"></i>{activeTrack.playback_count}</span>
                  <span><i className="fa fa-heart"></i>{activeTrack.favoritings_count}</span>
                  <span><i className="fa fa-comment"></i>{activeTrack.comment_count}</span>
                </div>
            </div>
            <div className="controls">
              <span className="control">
                <button
                    onClick={this.prevIndex.bind(this)}
                    className="prev-button"
                    {...this.props}
                ></button>
              </span>
              <span className="control">
                <button
                onClick={this.play.bind(this)}
                  className={playing ? 'play-btn pause' : 'play-btn play'}
                  {...this.props}
                />
              </span>
              <span className="control">
                <button
                    type="button"
                    onClick={this.nextIndex.bind(this)}
                    className="next-button"
                    {...this.props}
                />
              </span>
            </div>
            <div className="progress-time">
              <Progress
                  value={(currentTime / duration) * 100 || 0}
                  className="progress"
                  {...this.props}
              />
              <Timer duration={duration || 0} currentTime={currentTime} {...this.props} />
            </div>

              <button type="button" onClick={this.handleClick.bind(this)}>
                <i className="fa fa-list"></i>
              </button>

            {this.renderTrackList()}

            </div>
          );
    }
}

export default class Player extends Component {

  render() {
    return (
        <SoundPlayerContainer resolveUrl={markUrl} clientId={clientId} {...this.props}>
            <CustomPlayer />
        </SoundPlayerContainer>
    );
  }
}
