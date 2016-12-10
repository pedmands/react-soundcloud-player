import React, { PropTypes, Component } from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, PrevButton, NextButton, Progress, Timer, VolumeControl } from 'react-soundplayer/components';
import { Icons } from 'react-soundplayer/components';



const clientId = '08f79801a998c381762ec5b15e4914d5';
const straysUrl = 'https://soundcloud.com/markhphillips/sets/strays-soundtrack';

class CustomPlayer extends React.Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0,
            condition: false
        };
    }
    prettyTime(time) {
        let hours = Math.floor(time / 3600);
        let mins = '0' + Math.floor((time % 3600) / 60);
        let secs = '0' + Math.floor((time % 60));

        mins = mins.substr(mins.length - 2);
        secs = secs.substr(secs.length - 2);

        if (!isNaN(secs)) {
            if (hours) {
                return `${hours}:${mins}:${secs}`;
            }
            return `${mins}:${secs}`;
        }
        return '00:00';
    } //prettyTime
    prettyCount(count) {
      let kCount = (count / 1000);
      let finalCount = Math.round(kCount * 10 ) / 10;
      if (count > 1000) {
        return `${finalCount}k`;
      }
      return count;
    }
    play() {
        let { soundCloudAudio, playing } = this.props;
        if (playing) {
            soundCloudAudio.pause();
        } else {
            soundCloudAudio.play();
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
          const url = activeTrack.permalink_url;
          const playlistUrl = playlist.permalink_url;
          const userUrl = playlist.user.permalink_url;
          const logo = 'http://dev.bowdenweb.com/a/i/cons/icomoon/soundcloud1.png';
          const trackTitle = activeTrack.title;

          return (
            <div>
            <div className="cover"><a href={playlistUrl}></a></div>
            <div className="track-info">
                <h1><a href={url}>{trackTitle}</a></h1>
                <h3><a href={playlistUrl}>{playlist.title}</a></h3>
                <h2><a href={userUrl}>{activeTrack.user.username}</a></h2>
                <div className="meta">
                  <span><a href={playlistUrl}><img className="sc_logo" src={logo} /></a></span>
                  <span><i className="fa fa-play"></i>{this.prettyCount(activeTrack.playback_count)}</span>
                  <span><i className="fa fa-heart"></i>{this.prettyCount(activeTrack.favoritings_count)}</span>
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
                <PlayButton
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
            <span className="current-time">
            {this.prettyTime(currentTime)}
            </span>
              <Progress
                  value={(currentTime / duration) * 100 || 0}
                  className="my-progress"
                  {...this.props}
              />
              <span className="duration">
              {this.prettyTime(duration)}
              </span>
            </div>

              <button className= "playlist-toggle" type="button" onClick={this.handleClick.bind(this)}>
                <i className="fa fa-list"></i>
              </button>

            {this.renderTrackList()}

            </div>
          );
    }
}

export default class StraysPlayer extends Component {

  render() {
    return (
        <SoundPlayerContainer resolveUrl={straysUrl} clientId={clientId} {...this.props}>
            <CustomPlayer />
        </SoundPlayerContainer>
    );
  }
}
