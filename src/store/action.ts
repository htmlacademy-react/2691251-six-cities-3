import {createAction} from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';

export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const changeActiveCity = createAction<{city: City}>('offers/changeCity');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

