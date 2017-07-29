import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as reducers from '../reducers';

const reducer = combineReducers({
    ...reducers
})

export default function configureStore(preloadedState) {
    const store = createStore(
      reducer,
      preloadedState,
      applyMiddleware(thunkMiddleware, createLogger())
    );
    return store;
}
