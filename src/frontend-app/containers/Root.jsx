import React from 'react'
import {Provider} from 'react-redux'
import App from './App'
import DevTools from './DevTools'
import configureStore from '../redux/store/configureStore'

const devToolsComponent = process.env.NODE_ENV === 'production'
	? ('')
	: <DevTools />;

const store = configureStore();

const Root = () => {
	return (
		<Provider store={store}>
			<div>
				<App />
				{devToolsComponent}
			</div>
		</Provider>
	)
};

export default Root;