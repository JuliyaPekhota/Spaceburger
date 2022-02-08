import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../services/reducers';
import { userInitMiddleware } from './userInitMiddleware';
import { authUser } from '../services/actions/UserAuth';

const composeEnhancers =
  typeof window === 'object' && (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    ? (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(userInitMiddleware, thunk));

export const store = createStore(rootReducer, enhancer);

store.dispatch(authUser());
