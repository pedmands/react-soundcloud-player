import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

const clientId = '08f79801a998c381762ec5b15e4914d5';
const streamUrl = 'https://soundcloud.com/pedmands/before-he-goes';
const markUrl = 'https://api.soundcloud.com/playlists/59222356';

const { SoundCloudLogoSVG } = Icons;

import { PlayButton, Progress, Icons } from 'react-soundplayer/components';
import App from './components/app';
import Player from './components/player';
import Playlister from './components/player2';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Player />
  </Provider>
  , document.querySelector('.player')
);
