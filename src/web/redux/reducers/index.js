import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import groups from './groups'
import user from './user'

export default combineReducers({
	user,
	groups,
	routing: routerReducer
})