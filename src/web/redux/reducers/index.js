import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'
import groups from './groups'
import user from './user'
import lists from './lists'
import notifications from './notifications'

export default combineReducers({
	user,
	groups,
	lists,
	notifications,
	routing: routerReducer
})