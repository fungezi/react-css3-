//路由

import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import Redux,{ createStore,applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import {Router,Route,browserHistory,IndexRoute} from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';
import reducers from './reducers.js';
import App from './App.js';
import Home from './containers/Home.js';
import ShowList from './containers/ShowList.js';
import ArtPage from './containers/ArtPage.js'

const store = createStore(reducers,applyMiddleware(Thunk));

const history = syncHistoryWithStore(browserHistory, store);

ReactDom.render(
	<Provider store = {store} >
		<Router history = {history}>
			<Route path = '/' component = {Home} ></Route>
			<Route path='/project' component= {ShowList} ></Route>
			<Route path='/showList' component = {App} >
				<Route path=':cateId' component= {ShowList} ></Route>
			</Route>
			<Route path="/artPage/:pageId" component= { ArtPage }></Route>
		</Router>
	</Provider>,document.getElementById('app')

);