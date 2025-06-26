import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from './services/api';
import { State } from './types/state';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

import { AuthorizationStatus, CITIES, RequestStatus } from './const';

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: null
  },
  DATA: { offers: [], status: RequestStatus.Idle },
  APP: { city: CITIES[0] },
  OFFER: {
    info: null,
    nearby: [],
    status: RequestStatus.Idle,
    activeId: null
  },
  REVIEW: {
    items: [],
    status: RequestStatus.Idle
  },
  FAVORITES: {
    items: [],
    status: RequestStatus.Idle
  },
  ...initialState ?? {},
});
