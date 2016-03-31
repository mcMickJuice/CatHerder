import React from 'react'
import {Provider} from 'react-redux'
import Main from './Main'
import Home from './Home'
import GroupHome from '../components/GroupHome'
import DevTools from './DevTools'
import configureStore from '../redux/store/configureStore'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

const devToolsComponent = process.env.NODE_ENV === 'production'
	? ('')
	: <DevTools />;

//TODO pick this user out of local storage or wherever
const defaultState = {
	user: {
		username: 'mjoyce',
		displayName: 'Mike Joyce',
		imageUrl: 'http://i.imgur.com/YWJWjgj.jpg'
	},
	groups: {
		items: [
			{id: 1, name: 'Group 1', lists: [1,2,3]},
			{id: 2, name: 'Group 2', lists: [1,2,3]},
			{id: 3, name: 'Group 3', lists: [1]}
		]
	},
	lists: {
		items: [1,2]
	},
	notifications: [1]
};

const store = configureStore(defaultState);
const history = syncHistoryWithStore(browserHistory, store);

/*
 <Route path="group/create" />
 <Route path="group/:id">
 <IndexRoute component={GroupView} />
 <Route path="edit" component={GroupEdit}/>
 </Route>
 */

const Root = () => {
	return (
		<Provider store={store}>
			<div>
				<Router history={history}>
					<Route path="/" component={Main}>
						<IndexRoute component={Home}/>
						<Route path="group">
							<IndexRoute component={GroupHome} />
						</Route>
					</Route>
				</Router>
				{devToolsComponent}
			</div>
		</Provider>
	)
};

export default Root;