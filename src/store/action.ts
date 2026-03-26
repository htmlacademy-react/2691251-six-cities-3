import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const initOffers = createAction<{offers: Offer[]}>('offers/addOffers');
export const changeActiveCity = createAction<{city: string}>('offers/changeCity');

