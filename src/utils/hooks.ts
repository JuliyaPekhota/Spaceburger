import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './types';
import { TAppState, TAppAction } from '../services/reducers';
import { ThunkDispatch } from 'redux-thunk';

export type TThunkDispatch = ThunkDispatch<{}, {}, TAppAction>;

export const useAppThunkDispatch = () => useDispatch<TThunkDispatch>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector;