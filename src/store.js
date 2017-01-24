import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers.js';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { setUserName, addChannel, setChannel } from './actions';

export let store;

export function init() {
  const logger = createLogger();
  store = createStore(
    reducers,
    applyMiddleware(thunk, promise, logger)
  );

}

export function populate() {
  // Pre-populate some data

  store.dispatch(setUserName('dean'));

  store.dispatch(addChannel('general'));
  store.dispatch(addChannel('comedy'));
  store.dispatch(addChannel('music'));
  store.dispatch(addChannel('jibber', true));
  store.dispatch(addChannel('hacker', true));

  store.dispatch(setChannel('general'));
}

export default {
  init,
  populate,
  store
}