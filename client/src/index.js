import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './components/App';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';


const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);
socket.on('state', state =>
  store.dispatch(setState(state))
);


ReactDOM.render(
	<Provider store={store}>
  		<HashRouter>
			<Route path="/" component={App}/>
  		</HashRouter>
  	</Provider>,
  document.getElementById('app')
);