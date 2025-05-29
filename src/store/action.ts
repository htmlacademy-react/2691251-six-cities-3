import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export const addOffers = createAction<{offers: Offer[]}>('offers/addOffers');
export const changeCity = createAction<{city: string}>('offers/changeCity');

