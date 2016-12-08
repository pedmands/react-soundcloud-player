import React, { PropTypes, Component } from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, PrevButton, NextButton, Progress, Timer, VolumeControl } from 'react-soundplayer/components';
import PlaylistSoundPlayer from './player2';

const clientId = '08f79801a998c381762ec5b15e4914d5';
const streamUrl = 'https://soundcloud.com/pedmands/before-he-goes';
const markUrl = 'https://soundcloud.com/markhphillips/sets/original-score-from-serial-mark-h-phillips';

class CustomPlayer extends React.Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0
        };
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

    }
    prevIndex() {
        let { activeIndex } = this.state;
        if (activeIndex <= 0) {
            return;
        }

        this.setState({activeIndex: --activeIndex});

    }
    nextIndex() {
        let { activeIndex } = this.state;
        let { playlist } = this.props;
        if (activeIndex >= playlist.tracks.length - 1) {
            return;
        }

        this.setState({activeIndex: activeIndex + 1});

    }
    renderTrackList() {
      let {playlist} = this.props;

      const tracks = playlist.tracks.map((track, i) => {
        let classNames = "playlist-item";
        if (this.state.activeIndex === i) {
          classNames = "playlist-item active";
        }

        return (
          <button
            key={track.id}
            onClick={this.playTrackAtIndex.bind(this, i)}
            className={classNames}
          >
            {track.title}
          </button>
        );
      });
      return (
          <div>{tracks}</div>
      );
    }// renderTrackList
    render() {
        let { track, playing, playlist, duration, currentTime } = this.props;
        let { activeIndex } = this.state;
        console.log(playlist);
        if (!playlist) {
          return <div> Loading... </div>;
        }
          let activeTrack = playlist.tracks[activeIndex];
          const cover = playlist.artwork_url;
          return (
            <div>
            <div className="track-info">
                <h3>{activeTrack.title}</h3>
                <div className="favorites">Favorites: {activeTrack.favoritings_count}</div>
                <div className="plays">Plays: {activeTrack.playback_count}</div>
                <Timer duration={duration || 0} currentTime={currentTime} {...this.props} />
            </div>
            <div>
              <button onClick={this.play.bind(this)}>
                  {playing ? 'Pause' : 'Play'}
              </button>
              <PrevButton
                  onPrevClick={this.prevIndex.bind(this)}
                  className="prev-button"
                  {...this.props}
              />
              <NextButton
                  onNextClick={this.nextIndex.bind(this)}
                  onClick={this.nextIndex.bind(this)}
                  className="next-button"
                  {...this.props}
              />

              <Progress
                  value={(currentTime / duration) * 100 || 0}
                  {...this.props}
              />
            </div>
            <h4>{playlist ? playlist.title : ''}</h4>
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
