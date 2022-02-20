import { compose, createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer, TAppState, TAppAction } from '../services/reducers';
import { userInitMiddleware } from './userInitMiddleware';
import { authUser } from './actions/actionsUser';

const composeEnhancers =
  typeof window === 'object' && (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    ? (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(userInitMiddleware, thunk as ThunkMiddleware));

export const store = createStore<TAppState, TAppAction, unknown, unknown>(rootReducer, enhancer);

store.dispatch(authUser());
