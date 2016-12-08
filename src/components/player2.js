import React, { PropTypes, Component } from 'react';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import { PlayButton, PrevButton, NextButton, Progress, Timer, VolumeControl } from 'react-soundplayer/components';

const clientId = '08f79801a998c381762ec5b15e4914d5';
const streamUrl = 'https://soundcloud.com/pedmands/before-he-goes';
const markUrl = 'https://api.soundcloud.com/playlists/59222356';

class Player extends Component {
    constructor() {
        super();

        this.state = {
            activeIndex: 0
        };
    }

    playTrackAtIndex(playlistIndex) {
        let { soundCloudAudio } = this.props;
        this.setState({activeIndex: playlistIndex});
        soundCloudAudio.play({ playlistIndex });
    }

    nextIndex() {
        let { activeIndex } = this.state;
        let { playlist } = this.props;
        if (activeIndex >= playlist.tracks.length - 1) {
            return;
        }
        if (activeIndex || activeIndex === 0) {
            this.setState({activeIndex: ++activeIndex});
        }
    }

    prevIndex() {
        let { activeIndex } = this.state;
        if (activeIndex <= 0) {
            return;
        }
        if (activeIndex || activeIndex === 0) {
            this.setState({activeIndex: --activeIndex});
        }
    }

    renderTrackList() {
        let { playlist } = this.props;

        if (!playlist) {
            return <div>Loading...</div>;
        }

        let tracks = playlist.tracks.map((track, i) => {
            let classNames = ClassNames('flex flex-center full-width left-align button button-transparent', {
                'is-active': this.state.activeIndex === i
            });

            return (
                <button
                    key={track.id}
                    className={classNames}
                    onClick={this.playTrackAtIndex.bind(this, i)}
                >
                    <span className="flex-auto semibold">{track.user.username} - {track.title}</span>
                    <span className="h6 regular">{Timer.prettyTime(track.duration / 1000)}</span>
                </button>
            );
        });

        return (
            <div>{tracks}</div>
        );
    }

    render() {
        let { playlist, currentTime, duration } = this.props;

        return (
            <div>
              <div>
                <div>
                    <h2>{playlist ? playlist.user.username : ''}</h2>
                    <Timer duration={duration || 0} currentTime={currentTime} {...this.props} />
                </div>
                <h2>{playlist ? playlist.title : ''}</h2>
                <div>
                    <PrevButton
                        onPrevClick={this.prevIndex.bind(this)}
                        {...this.props}
                    />
                    <PlayButton
                        {...this.props}
                    />
                    <NextButton
                        onNextClick={this.nextIndex.bind(this)}
                        {...this.props}
                    />
                    <VolumeControl
                        buttonClassName="flex-none h4 button button-transparent button-grow rounded"
                        {...this.props}
                    />
                    <Progress
                        value={(currentTime / duration) * 100 || 0}
                        {...this.props}
                    />
                </div>
              </div>
                {this.renderTrackList()}
            </div>
        );
    }
}

class Playlister extends Component {
    render() {
        return (
            <SoundPlayerContainer resolveUrl={streamUrl} clientId={clientId} {...this.props}>
                <Player />
            </SoundPlayerContainer>
        );
    }
}

export default Playlister;
