import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization, loadOffers, changeActiveCity, setOffersDataLoadingStatus } from './action';
import { City, Offer } from '../types/offer';
import { CITIES } from '../mocks/cities';
import { AuthorizationStatus } from '../const';

type StateType = {
  city: City;
  offers: Offer[];
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: StateType = {
  city: CITIES[0],
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export { reducer };
