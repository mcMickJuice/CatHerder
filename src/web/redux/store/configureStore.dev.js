import {createStore, applyMiddleware, compose} from 'redux';
import DevTools from '../../containers/DevTools'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const enhancer = compose(
	applyMiddleware(thunk),
	DevTools.instrument()
)

const configureStore = (initialState) => {
	const store = createStore(rootReducer, initialState, enhancer);

	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducers(require('../reducers'))
		)
	}

	return store;
}

export default configureStore