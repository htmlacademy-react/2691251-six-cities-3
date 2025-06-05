import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, changeActiveCity, setOffersDataLoadingStatus } from './action';
import { City, Offer } from '../types/offer';
import { CITIES } from '../mocks/cities';

type StateType = {
  city: City;
  offers: Offer[];
  isOffersDataLoading: boolean;
}

const initialState: StateType = {
  city: CITIES[0],
  offers: [],
  isOffersDataLoading: false
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
    });
});

export { reducer };
