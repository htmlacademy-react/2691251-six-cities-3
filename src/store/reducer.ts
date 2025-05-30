import { createReducer } from '@reduxjs/toolkit';
import { initOffers, changeActiveCity } from './action';
import { Offer } from '../types/offer';

type StateType = {
  city: string;
  offers: Offer[];
}

const initialState: StateType = {
  city: 'Paris',
  offers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeActiveCity, (state, action) => {
      const { city } = action.payload;
      state.city = city;
    })
    .addCase(initOffers, (state, action) => {
      const { offers } = action.payload;
      state.offers = offers;
    });
});

export { reducer };
