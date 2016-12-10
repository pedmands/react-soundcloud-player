import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import { PlayButton, Progress, Icons } from 'react-soundplayer/components';

import SerialPlayer from './components/serial-player';
import StraysPlayer from './components/strays-player';
import BayardPlayer from './components/bayard-player';
import SonoPlayer from './components/sono-player';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


window.renderSerial = (targetElement) => ReactDOM.render(<SerialPlayer />, targetElement);
window.renderStrays = (targetElement) => ReactDOM.render(<StraysPlayer />, targetElement);
window.renderBayard = (targetElement) => ReactDOM.render(<BayardPlayer />, targetElement);
window.renderSono = (targetElement) => ReactDOM.render(<SonoPlayer />, targetElement);
