import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from './reducers/homeReducer.js';
import showListReducer from './reducers/showListReducer.js';

const reducer = combineReducers({
	routing:routerReducer,
	homeReducer:homeReducer,
	showListReducer:showListReducer,
});

export default reducer;