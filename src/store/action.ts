import {createAction} from '@reduxjs/toolkit';
import { City, Offer } from '../types/offer';
import {AuthorizationStatus} from '../const';


export const changeActiveCity = createAction<{city: City}>('offers/changeCity');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('game/setError');

