import { createReducer } from '@reduxjs/toolkit';
import { setError, setUserEmail, requireAuthorization, loadOffers, changeActiveCity, setOffersDataLoadingStatus } from './action';
import { City, Offer } from '../types/offer';
import { CITIES } from '../mocks/cities';
import { AuthorizationStatus } from '../const';

type StateType = {
  city: City;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | null;
  userEmail: string;
}

const initialState: StateType = {
  city: CITIES[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
  userEmail: ''
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      const { city } = action.payload;
      state.city = city;
    })
    .addCase(loadOffers, (state, action) => {
      const offers = action.payload;
      state.offers = offers;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
