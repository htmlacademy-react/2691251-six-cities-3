import {createAction} from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';

export const initOffers = createAction<{offers: Offer[]}>('offers/addOffers');
export const changeActiveCity = createAction<{city: City}>('offers/changeCity');

