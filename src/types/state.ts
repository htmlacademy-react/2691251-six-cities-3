import { store } from '../store/index';
import { AuthorizationStatus } from '../const';
import { Offer, City } from './offer';
import { RequestStatus } from '../const';
import { UserData } from './user-data';

export type AppData = {
  offers: Offer[];
  status: RequestStatus;
};

export type AppProcess = {
  city: City;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
