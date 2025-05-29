import { createReducer } from '@reduxjs/toolkit';
import { addOffers, changeCity } from './action';
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
    .addCase(changeCity, (state, action) => {
      const { city } = action.payload;
      state.city = city;
    })
    .addCase(addOffers, (state, action) => {
      const { offers } = action.payload;
      state.offers = offers;
    });
});

export { reducer };
