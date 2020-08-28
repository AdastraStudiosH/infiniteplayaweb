import rootReducer from './redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );
  return store;
};