import React from 'react'
import {Provider} from 'react-redux'
import Main from './Main'
import Home from './Home'
import DevTools from './DevTools'
import configureStore from '../redux/store/configureStore'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

const devToolsComponent = process.env.NODE_ENV === 'production'
	? ('')
	: <DevTools />;

//TODO pick this user out of local storage or wherever
const defaultUser = {
	username: 'mjoyce',
	displayName: 'Mike Joyce',
	imageUrl: 'http://i.imgur.com/YWJWjgj.jpg'
};
const store = configureStore({user: defaultUser});
const history = syncHistoryWithStore(browserHistory, store);

const Root = () => {
	return (
		<Provider store={store}>
			<div>
				<Router history={history}>
					<Route path="/" component={Main}>
						<IndexRoute component={Home}/>
					</Route>
				</Router>
				{devToolsComponent}
			</div>
		</Provider>
	)
};

export default Root;