import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const';
import { Offer, City } from './offer.js';

export type AppData = {
  offers: Offer[];
  isOffersDataLoading: boolean;
};

export type AppProcess = {
  city: City;
  error: boolean;
  userEmail: string;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
